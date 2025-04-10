import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function throwException(error: string, status: HttpStatus) {
  throw new HttpException(
    {
      statusCode: status,
      message: error,
    },
    status,
  );
}

export class ApiOKResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty()
  message: any;
}

export class ApiErrorResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty()
  message: any;

  @ApiProperty()
  error: string;
}
