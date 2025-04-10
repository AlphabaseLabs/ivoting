import { HttpStatus } from '@nestjs/common';

interface ErrorInterface {
  statusCode: HttpStatus;
  errId: number;
  errMsg: string;
}

export const ERRORS = {
  FAILED_PRE_CONDITIONS: 'FAILED_PRE_CONDITIONS',
  PHONE_NR_EXISTS: 'PHONE_NR_EXISTS',
  INVALID_PHONE_NR: 'INVALID_PHONE_NR',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  INVALID_PASSPORT_NR: 'INVALID_PASSPORT_NR',
  NATIONAL_ID_EXISTS: 'NATIONAL_ID_EXISTS',
  PASSPORT_NR_EXISTS: 'PASSPORT_NR_EXISTS',
  PHONE_NR_NOT_VERIFIED: 'PHONE_NR_NOT_VERIFIED',
  INVALID_VERIFICAION_CODE: 'INVALID_VERIFICAION_CODE',
  INVALID_NATIONAL_IDENTITY: 'INVALID_NATIONAL_IDENTITY',
  ALREADY_SUBMITTED: 'ALREADY_SUBMITTED',
  ANSWERS_ALREADY_EXISTS: 'ANSWERS_ALREADY_EXISTS',
  IMAGE_ALREADY_EXISTS: 'IMAGE_ALREADY_EXISTS',
  ANSWERS_NOT_FOUND: 'ANSWERS_NOT_FOUND',
  IMAGES_NOT_FOUND: 'IMAGES_NOT_FOUND',
  RECORD_NOT_FOUND: 'RECORD_NOT_FOUND',
  RECORD_EXISTS: 'RECORD_EXISTS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

export class Error {
  public static DbErrorHandler(err: any): ErrorInterface {
    if (err.code === '23505')
      return {
        statusCode: HttpStatus.CONFLICT,
        errId: HttpStatus.CONFLICT,
        errMsg: ERRORS.RECORD_EXISTS,
      };
    else if (err.code === '23503')
      return {
        statusCode: HttpStatus.NOT_FOUND,
        errId: HttpStatus.NOT_FOUND,
        errMsg: ERRORS.RECORD_NOT_FOUND,
      };
    else
      return {
        statusCode: HttpStatus.CONFLICT,
        errId: HttpStatus.CONFLICT,
        errMsg: ERRORS.INTERNAL_SERVER_ERROR,
      };
  }
}
