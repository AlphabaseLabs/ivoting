import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { ApiErrorResponse } from 'src/utils/utils.service';
import { UserApiErrors } from './errors-user.dto';

export class resetPasswordApi {
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
  @IsString()
  identity: string;
}

export const ResetPasswordApiSwaggerDocs = applyDecorators(
  ApiParam({
    name: 'identity',
    required: true,
    description: 'User identity',
  }),

  ApiNotFoundResponse({
    description: `When user is not found Errors: ${JSON.stringify(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
    )}`,
    type: ApiErrorResponse,
  }),
);
