import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, UUIDVersion } from 'class-validator';
import { UserApiErrors } from 'src/users/dto/errors-user.dto';
import { ApiErrorResponse, ApiOKResponse } from 'src/utils/utils.service';

export class CreateUploadApiDto {
  @ApiProperty({
    required: true,
    description: 'User id',
  })
  @IsUUID()
  user: UUIDVersion;

  @ApiProperty({ required: true, description: 'File to upload' })
  @IsNotEmpty()
  selfie: any;
}

export class GetUploadApiDto {
  @ApiProperty({
    required: true,
    description: 'Array of base64 encoded image',
  })
  data: Array<string>;
}

export const GetUploadsApiSwaggerDocs = applyDecorators(
  ApiParam({
    name: 'user',
    required: true,
    description: 'User to fetch data',
  }),

  ApiOkResponse({
    description: 'Return the requested data',
    type: ApiOKResponse,
  }),

  ApiNotFoundResponse({
    description: `When user is not found Errors: ${JSON.stringify(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
    )}`,
    type: ApiErrorResponse,
  }),
);
