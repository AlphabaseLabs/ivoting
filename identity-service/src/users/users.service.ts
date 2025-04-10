import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import * as _ from 'lodash';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import { AnswerService } from 'src/answers/answers.service';
import { CreateAnswersDto } from 'src/answers/dto/create-answers.dto';
import { configService } from 'src/config/config.service';
import { QuestionService } from 'src/questions/questions.service';
import { SmsService } from 'src/sms/sms.service';
import { UploadsService } from 'src/uploads/uploads.service';
import { throwException } from 'src/utils/utils.service';
import { CreateUserApi, VerifyPhoneNumberApi } from './dto/create-user.dto';
import { UserApiErrors } from './dto/errors-user.dto';
import { User, UserStatusEnum } from './entities/user.entity';
import { In } from 'typeorm';
import { ApproveUserApiDto } from './dto/approve-user.dto';
import { resetPasswordApi } from './dto/reset-password.dto';

const elections = [
  'NA1',
  'NA2',
  'NA3',
  'NA4',
  'NA5',
  'NA6',
  'NA7',
  'NA8',
  'NA9',
  'NA10',
];

let ENABLE_PHONE_NR_VERIFICATION: boolean;
let ENABLE_QUESTIONS_VERIFICATION: boolean;
let DEFAULT_LOGIN_PASSWORD: any;

@Injectable()
export class UsersService {
  constructor(
    private readonly smsService: SmsService,
    private readonly questionsService: QuestionService,
    private readonly uploadsService: UploadsService,
    private readonly answerService: AnswerService,
  ) {
    DEFAULT_LOGIN_PASSWORD = configService.defaultPassword();
    ENABLE_PHONE_NR_VERIFICATION = configService.phoneNrVerficationEnabled();
    ENABLE_QUESTIONS_VERIFICATION = configService.questionsVerficationEnabled();
  }

  async create(createUserApi: CreateUserApi): Promise<any> {
    let statusCode: HttpStatus;

    let user = await User.findOne({
      where: [
        {
          phone_nr: createUserApi.phone_nr,
        },
        {
          passport_nr: createUserApi.passport_nr,
        },
        {
          national_identity: createUserApi.national_identity,
        },
      ],
    });

    if (!user) {
      const newUser: any = createUserApi;
      newUser.status = UserStatusEnum.PENDING_PHONE_VERIFICATION;
      newUser.password = ENABLE_PHONE_NR_VERIFICATION
        ? Math.floor(100000 + Math.random() * 900000).toString()
        : DEFAULT_LOGIN_PASSWORD;

      user = await User.create(createUserApi).save();

      statusCode = HttpStatus.CREATED;
      console.log(`creating user ${createUserApi.national_identity}`);
    } else statusCode = HttpStatus.OK;

    if (
      ENABLE_PHONE_NR_VERIFICATION &&
      user.status == UserStatusEnum.PENDING_PHONE_VERIFICATION
    ) {
      await this.smsService.initiatePhoneNumberVerification(user.phone_nr);
    }

    return {
      statusCode: statusCode,
      message: {
        uuid: user.uuid,
        status: user.status,
      },
    };
  }

  async verifyPhoneNumber(vpna: VerifyPhoneNumberApi): Promise<any> {
    let user = await isUserExists({
      uuid: vpna.user,
      status: UserStatusEnum.PENDING_PHONE_VERIFICATION,
    });

    if (ENABLE_PHONE_NR_VERIFICATION) {
      console.log(`verifying phone number ${user.phone_nr}`);
      await this.smsService.confirmPhoneNumber(
        user.phone_nr,
        vpna.verification_code,
      );
    } else {
      if (vpna.verification_code != DEFAULT_LOGIN_PASSWORD)
        throwException(
          UserApiErrors[HttpStatus.BAD_REQUEST].INVALID_VERIFICATION_CODE,
          HttpStatus.BAD_REQUEST,
        );
    }

    user.status = UserStatusEnum.PENDING_ANSWERS;
    user = await user.save();

    return {
      statusCode: HttpStatus.OK,
      message: {
        status: user.status,
      },
    };
  }

  async saveAnswers(createAnswersDto: CreateAnswersDto): Promise<any> {
    const user = await isUserExists({
      uuid: createAnswersDto.user,
      status: In([
        UserStatusEnum.PENDING_ANSWERS,
        UserStatusEnum.PENDING_UPLOADS,
      ]),
    });

    await this.answerService.saveAnswers(createAnswersDto);
    await updateStatus(user, UserStatusEnum.PENDING_UPLOADS);
    return {
      statusCode: HttpStatus.OK,
      message: {
        status: user.status,
      },
    };
  }

  async uploadImages(_body): Promise<any> {
    let user = await isUserExists({
      uuid: _body.user.value,
      status: In([
        UserStatusEnum.PENDING_ANSWERS,
        UserStatusEnum.PENDING_UPLOADS,
      ]),
    });

    await this.uploadsService.saveImages(_body);
    user = await updateStatus(user, UserStatusEnum.PENDING_ACCEPTANCE);
    user.elections = [
      elections[Math.floor(Math.random() * 10)],
      elections[Math.floor(Math.random() * 10)],
    ];
    delete user.password;
    user = await User.save(user);
    return {
      statusCode: HttpStatus.OK,
      message: {
        status: user.status,
      },
    };
  }

  // TODO: verify profile is in valid state to sumbit
  async submitProfile(user: UUIDVersion): Promise<any> {
    let _user = await isUserExists({
      uuid: user,
      // status: In([UserStatusEnum.PENDING_ANSWERS, UserStatusEnum.PENDING_UPLOADS])
    });

    _user = await updateStatus(_user, UserStatusEnum.PENDING_ACCEPTANCE);
    return {
      statusCode: HttpStatus.OK,
      message: {
        status: _user.status,
      },
    };
  }

  async getUploads(user: UUIDVersion): Promise<any> {
    await isUserExists({ uuid: user });
    const resp = await this.uploadsService.getImages(user);
    return {
      statusCode: HttpStatus.OK,
      message: resp,
    };
  }

  async getUsers(
    options: IPaginationOptions,
    passport: string,
    identity: string,
  ): Promise<Pagination<User>> {
    const queryBuilder = User.createQueryBuilder('v');
    queryBuilder.orderBy('v.id', 'ASC');
    queryBuilder.where(
      _.pickBy({
        passport_nr: passport,
        national_identity: identity,
      }),
    );
    queryBuilder.select([
      'v.uuid',
      'v.first_name',
      'v.last_name',
      'v.email',
      'v.national_identity',
      'v.passport_nr',
      'v.phone_nr',
      'v.status',
      'v.wallet_address',
      'v.createdAt',
      'v.updatedAt',
      'v.elections',
    ]);
    const data: any = await paginate<User>(queryBuilder, options);
    data.items = data.items.map((_user) => {
      return _.pickBy(_user);
    });
    return data;
  }

  async getUserDetails(user: UUIDVersion) {
    const _user = await User.findOne({
      select: [
        'uuid',
        'first_name',
        'last_name',
        'status',
        'elections',
      ],
      where: {
        uuid: user,
      },
    });

    if (!_user)
      throwException(
        UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    return _.pickBy(_user);
  }

  async getUser(user: UUIDVersion) {
    const _user = await User.findOne({
      select: [
        'uuid',
        'first_name',
        'last_name',
        'email',
        'national_identity',
        'passport_nr',
        'phone_nr',
        'status',
        'wallet_address',
        'createdAt',
        'updatedAt',
        'elections',
      ],
      where: {
        uuid: user,
      },
    });

    if (!_user)
      throwException(
        UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    return _.pickBy(_user);
  }

  async getUserStatus(user: UUIDVersion) {
    const _user = await User.findOne({
      select: ['status'],
      where: {
        uuid: user,
      },
    });

    if (!_user)
      throwException(
        UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    return _user;
  }

  async getUserAnswers(user: UUIDVersion) {
    const answers = await this.answerService.getUserAnswers(user);
    return {
      statusCode: HttpStatus.OK,
      message: answers,
    };
  }

  async approve(
    user_id: UUIDVersion,
    approveUserApiDto: ApproveUserApiDto,
  ): Promise<any> {
    let _user = await isUserExists({
      uuid: user_id,
      status: In([UserStatusEnum.PENDING_ACCEPTANCE, UserStatusEnum.ACTIVE]),
    });

    _user.status = UserStatusEnum.ACTIVE;
    _user.elections = approveUserApiDto.elections;
    _user = await User.save(_user);
    return {
      statusCode: HttpStatus.OK,
      message: {
        status: _user.status,
      },
    };
  }

  async resetPassword(user: resetPasswordApi): Promise<any> {
    let _user = await isUserExists({
      national_identity: user.identity,
      status: UserStatusEnum.ACTIVE,
    });

    _user.password = ENABLE_PHONE_NR_VERIFICATION
      ? Math.floor(100000 + Math.random() * 900000).toString()
      : DEFAULT_LOGIN_PASSWORD;

    // TODO: send reset password to user;

    _user = await User.save(_user);

    return {
      statusCode: HttpStatus.OK,
      message: {
        status: 'Password_reset',
      },
    };
  }
}

async function isUserExists(filter: any): Promise<User> {
  const _user = await User.findOne({
    select: [
      'id',
      'uuid',
      'first_name',
      'last_name',
      'email',
      'national_identity',
      'passport_nr',
      'phone_nr',
      'status',
      'wallet_address',
      'createdAt',
      'updatedAt',
      'elections',
    ],
    where: filter,
  });

  if (!_user)
    throwException(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );

  return _user;
}

async function updateStatus(user: User, status: UserStatusEnum): Promise<User> {
  user.status = status;
  return await User.save(user);
}
