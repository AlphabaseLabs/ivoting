import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UUIDVersion } from 'class-validator';
import { AnswerService } from 'src/answers/answers.service';
import { CreateAnswersDto } from 'src/answers/dto/create-answers.dto';
import { configService } from 'src/config/config.service';
import { QuestionService } from 'src/questions/questions.service';
import { User, UserStatusEnum } from 'src/users/entities/user.entity';
import { throwException } from 'src/utils/utils.service';
import { AuthLoginAdminDto, AuthLoginDto } from './dto/auth-login.dto';
import { ROLES } from './entities/roles.enum';
import { getECDSASignatureSigner } from 'src/web3/web3.';
import { hasAdminLoginRole } from 'src/web3/access-control-contract';


const JWT_EXPIRY_FOR_USER = configService.getJwtExpiryForUser();
const JWT_EXPIRY_FOR_ADMIN = configService.getJwtExpiryForAdmin();
const JWT_EXPIRY_FOR_2FA_REQUEST = configService.getJwtExpiryFor2FARequest();
const ADMIN_LOGIN_SIGNATURE_EXPIRY =
  configService.getAdminLoginSignatureExpiryTime();

const is2FAEnabled = configService.is2FAEnabled();

@Injectable()
export class AuthService {
  constructor(
    private questionsService: QuestionService,
    private answersService: AnswerService,
    private jwtService: JwtService,
  ) { }

  /**
   * @dev creates a token with 
   * `PENDING_AUTH` if 2FA is enabled and issue a token for `JWT_EXPIRY_FOR_2FA_REQUEST`
   * `USER` if 2FA is disabled and issue a token for `JWT_EXPIRY_FOR_USER`
   * 
   * @param authLoginDto
   * @returns access_token 
   */
  async validateUserPassword(authLoginDto: AuthLoginDto) {
    const user = await this._validateUser(authLoginDto);

    const payload = {
      uuid: user.uuid,
      role: is2FAEnabled ? ROLES.PENDING_AUTH : ROLES.USER,
    };

    return {
      statusCode: HttpStatus.OK,
      message: {
        access_token: this.jwtService.sign(payload, {
          expiresIn: is2FAEnabled ? JWT_EXPIRY_FOR_2FA_REQUEST : JWT_EXPIRY_FOR_USER,
        }),
      },
    };
  }

  async getUserSecurityQuestions(user: UUIDVersion) {
    const questions = await this.questionsService.getUserQuestions(user);
    return {
      statusCode: HttpStatus.OK,
      message: questions,
    };
  }

  async securityQuestionAnswers(answers: CreateAnswersDto) {
    await this.answersService.validateUserAnswers(answers);
    const payload = {
      uuid: answers.user,
      role: ROLES.USER,
    };

    return {
      statusCode: HttpStatus.OK,
      message: {
        access_token: this.jwtService.sign(payload, {
          expiresIn: JWT_EXPIRY_FOR_USER,
        }),
      },
    };
  }

  async loginAdmin(authLoginAdminDto: AuthLoginAdminDto) {
    if (verifyLoginSignatureExpiry(authLoginAdminDto.expiry)) {
      const signer = getECDSASignatureSigner(
        authLoginAdminDto.expiry,
        authLoginAdminDto.signature,
      );
      await hasAdminLoginRole(signer);

      const payload = {
        address: signer,
        role: ROLES.ADMIN,
      };

      return {
        statusCode: HttpStatus.OK,
        message: {
          access_token: this.jwtService.sign(payload, {
            expiresIn: JWT_EXPIRY_FOR_ADMIN,
          }),
        },
      };
    } else throwException('Signature_expired', HttpStatus.UNAUTHORIZED);
  }

  private async _validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { identity, password } = authLoginDto;

    const user = await User.findOne({
      select: ['uuid', 'password', 'status'],
      where: {
        national_identity: identity,
        status: UserStatusEnum.ACTIVE,
      },
    });

    if (!(await user?.validatePassword(password))) {
      throwException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

}

// expiry should be not less than 1 min
function verifyLoginSignatureExpiry(expiry: string): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return parseInt(expiry) > currentTime - ADMIN_LOGIN_SIGNATURE_EXPIRY;
}
