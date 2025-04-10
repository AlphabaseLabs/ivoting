import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  UUIDVersion,
} from 'class-validator';
import { UserApiErrors } from './errors-user.dto';
import { SmsApiErrors } from 'src/sms/dto/errors-sms.dto';
import { ApiErrorResponse, ApiOKResponse } from 'src/utils/utils.service';

export class ValidateNewUser {
  @applyDecorators(
    ApiProperty({
      required: true,
      description: 'phone number',
      format: '/[+]{1}[0-9]{12}$/',
    }),
    Matches(/[+]{1}[0-9]{12}$/, {
      message: UserApiErrors[HttpStatus.BAD_REQUEST].INVALID_PHONE_NR,
    }),
  )
  phone_nr: string;

  @applyDecorators(
    ApiProperty({
      required: true,
      description: 'passport number',
      maxLength: 9,
      minLength: 9,
    }),
    Length(9, 9, {
      message: UserApiErrors[HttpStatus.BAD_REQUEST].INVALID_PASSPORT_NR,
    }),
  )
  passport_nr: string;

  @applyDecorators(
    ApiProperty({
      required: true,
      description: 'national identity',
      format: '/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/',
    }),
    Matches(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/, {
      message: UserApiErrors[HttpStatus.BAD_REQUEST].INVALID_NATIONAL_IDENTITY,
    }),
  )
  national_identity: string;
}

export class CreateUserApi extends ValidateNewUser {
  @applyDecorators(IsOptional(), IsString(), Length(0, 255))
  password: string;

  @applyDecorators(IsOptional(), IsString())
  first_name: string;

  @applyDecorators(IsOptional(), IsString())
  last_name: string;

  @applyDecorators(IsOptional(), IsString())
  email: string;

  @applyDecorators(IsOptional(), IsString())
  wallet_address: string;
}

export class VerifyPhoneNumberApi {
  @applyDecorators(
    ApiProperty({
      required: false,
      description: 'user uuid',
    }),
    IsUUID(),
  )
  user: UUIDVersion;

  @applyDecorators(
    ApiProperty({
      required: false,
      description: 'verification code',
      format: '/^[0-9]{6}$/',
      maxLength: 6,
      minLength: 6,
    }),
    Length(6, 6, {
      message: UserApiErrors[HttpStatus.BAD_REQUEST].INVALID_VERIFICATION_CODE,
    }),
  )
  verification_code: string;
}

export const CreateUserApiSwaggerDocs = applyDecorators(
  ApiCreatedResponse({
    description:
      'Returns 201 if its a new user with message containing uuid and status',
    type: ApiOKResponse,
  }),

  ApiOkResponse({
    description:
      'Returns 200 if its an existing user with message containing uuid and status',
    type: ApiOKResponse,
  }),

  ApiBadRequestResponse({
    description: `Returns 400 with if request body validation is failed. Errors: ${Object.values(
      UserApiErrors[HttpStatus.BAD_REQUEST],
    )}`,
    type: ApiErrorResponse,
  }),
);

export const VerifyPhonenNrApiSwaggerDocs = applyDecorators(
  ApiOkResponse({
    description:
      'Returns 200 if phone number is verifed with message containing status',
    type: ApiOKResponse,
  }),

  ApiBadRequestResponse({
    description: `Returns 400 with if request body validation is failed. Errors: ${Object.values(
      UserApiErrors[HttpStatus.BAD_REQUEST],
    )}`,
    type: ApiErrorResponse,
  }),

  ApiUnauthorizedResponse({
    description: `if sms service is not working. Errors: ${
      SmsApiErrors[HttpStatus.UNAUTHORIZED].AUTH_FAILED
    }`,
    type: ApiErrorResponse,
  }),

  ApiNotFoundResponse({
    description: `if no user is found against the given uuid. Errors: ${
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND
    }`,
    type: ApiErrorResponse,
  }),

  ApiInternalServerErrorResponse({
    description: `if verificaion service is unable to verify. Errors: ${
      SmsApiErrors[HttpStatus.INTERNAL_SERVER_ERROR].VERIFICAION_IS_NOT_WORKING
    }`,
    type: ApiErrorResponse,
  }),

  ApiPreconditionFailedResponse({
    description: `if verificaion is disabled.`,
    type: ApiErrorResponse,
  }),
);
