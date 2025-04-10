import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, UUIDVersion } from 'class-validator';
import { UserApiErrors } from 'src/users/dto/errors-user.dto';
import { ApiErrorResponse } from 'src/utils/utils.service';
import { UploadApiErrors } from './errors-upload.dto';

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

export const UploadFilesApiSwaggerDocs = applyDecorators(
  ApiConflictResponse({
    description: `if required data already exists. Errors: ${JSON.stringify(
      Object.keys(UploadApiErrors[HttpStatus.CONFLICT]),
    )}`,
    type: ApiErrorResponse,
  }),
  ApiNotFoundResponse({
    description: `When user is not found Errors: ${JSON.stringify(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
    )}`,
    type: ApiErrorResponse,
  }),
);
