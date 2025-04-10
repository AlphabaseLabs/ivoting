import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { ApiErrorResponse } from 'src/utils/utils.service';
import { UserApiErrors } from './errors-user.dto';

export const GetUserApiSwaggerDocs = applyDecorators(
  ApiParam({
    name: 'user',
    required: true,
    description: 'User to fetch data',
  }),

  ApiNotFoundResponse({
    description: `When user is not found Errors: ${JSON.stringify(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
    )}`,
    type: ApiErrorResponse,
  }),
);
