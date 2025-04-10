import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiPreconditionFailedResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, Length } from 'class-validator';
import { configService } from 'src/config/config.service';
import { ApiErrorResponse } from 'src/utils/utils.service';
import { UserApiErrors } from './errors-user.dto';

export class ApproveUserApiDto {
  @ApiProperty({ required: true })
  @IsArray()
  @ArrayMinSize(1)
  @Length(2, 30, { each: true })
  @ArrayMaxSize(configService.getMaxVotesToCast())
  elections: Array<string>;
}

export const ApproveUserApiSwaggerDocs = applyDecorators(
  ApiParam({
    name: 'user',
    required: true,
    description: 'User to fetch data',
  }),

  ApiOkResponse({
    description: 'Return 200 if user is successfully approved',
    type: ApiOkResponse,
  }),

  ApiNotFoundResponse({
    description: `When user is not found Errors: ${JSON.stringify(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
    )}`,
    type: ApiErrorResponse,
  }),

  ApiPreconditionFailedResponse({
    description: `if request has some issing data. Errors: ${JSON.stringify(
      Object.keys(UserApiErrors[HttpStatus.NOT_ACCEPTABLE]),
    )}`,
    type: ApiErrorResponse,
  }),
);
