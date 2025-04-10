import * as fs from 'fs';
import * as util from 'util';
import { Stream } from 'stream';
import { join } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UploadApiErrors } from './dto/errors-upload.dto';
import { configService } from 'src/config/config.service';

/* eslint-disable */
const currentDir = require('path').resolve('./');

const workingDir = join(currentDir, 'uploads', '/');

const allowedFiles = ['image/jpeg', 'image/png'];

const pump = util.promisify(Stream.pipeline);

if (!fs.existsSync(workingDir)) {
  fs.mkdirSync(workingDir);
}

export default {
  throwFileSizeLimit: true,
  attachFieldsToBody: true,
  limits: {
    // fieldNameSize: 100, // Max field name size in bytes
    // fieldSize: 100, // Max field value size in bytes
    fields: 1, // Max number of non-file fields
    fileSize: configService.getFileUploadSize() * 1024 * 1024, // For multipart forms, the max file size
    files: 1, // Max number of file fields
    // headerPairs: 1,   // Max number of header key=>value pairs
  },
  onFile,
}

async function onFile(part) {
  if (allowedFiles.indexOf(part.mimetype) == -1)
    throwException(UploadApiErrors[HttpStatus.NOT_ACCEPTABLE].INVALID_FILE_TYPE, HttpStatus.NOT_ACCEPTABLE);

  part.newFileName = part.filename.replace(/\s/g, '') + '.jpg';

  part.filePath = workingDir + part.newFileName;

  await pump(part.file, fs.createWriteStream(part.filePath));
}

function throwException(error: string, status: HttpStatus) {
  throw new HttpException({
    message: error
  }, status);
}