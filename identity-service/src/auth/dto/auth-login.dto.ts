import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';
import { UserApiErrors } from 'src/users/dto/errors-user.dto';
import { ApiErrorResponse, ApiOKResponse } from 'src/utils/utils.service';

export class AuthLoginDto {
  @ApiProperty({
    required: true,
    description: 'national identity',
    format: '/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/',
  })
  @Matches(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/, {
    message: UserApiErrors[HttpStatus.BAD_REQUEST].INVALID_NATIONAL_IDENTITY,
  })
  identity: string;

  @ApiProperty({ required: true })
  @Length(0, 255)
  @IsString()
  password: string;
}

export const UserLoginApiSwaggerDocs = applyDecorators(
  ApiUnauthorizedResponse({ type: ApiErrorResponse }),

  ApiNotFoundResponse({
    description: `When user is not found Errors: ${JSON.stringify(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
    )}`,
    type: ApiErrorResponse,
  }),

  ApiOkResponse({
    description:
      'Return 200 if user is successfully logged in. message contains the signature and expiry',
    type: ApiOKResponse,
  }),
);

export class AuthLoginAdminDto {
  @ApiProperty({ type: 'string', required: true })
  @IsString()
  expiry: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  signature: string;
}

export class GenerateSignatureResponseDto {
  expiry: HttpStatus;
  access_token: string;
}
