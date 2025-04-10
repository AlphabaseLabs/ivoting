import { Injectable } from '@nestjs/common';
import { Upload } from './entities/upload.entity';
import * as fs from 'fs';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class UploadsService {
  public async getImages(user: UUIDVersion): Promise<any> {
    const files = await Upload.find({
      select: ['data', 'mimetype'],
      where: {
        user_id: user,
      },
    });

    const _files = files.map((_file) => {
      return `data:${_file.mimetype};base64, ` + _file.data.toString();
    });
    return Promise.resolve(_files);
  }

  public async saveImages(_body): Promise<Upload> {
    const alreadyHave = await this.getImages(_body.user.value);
    if (alreadyHave.length > 0) Upload.softRemove(alreadyHave);

    const saveFile: Partial<Upload> = {
      data: Buffer.from(
        fs.readFileSync(_body.selfie.filePath).toString('base64'),
      ),
      mimetype: _body.selfie.mimetype,
      encoding: _body.selfie.encoding,
      user_id: _body.user.value,
      file_name: _body.selfie.newFileName,
      file_type: 'selfie',
      original_name: _body.selfie.filename,
    };
    await Upload.save(Upload.create(saveFile));
    return;
  }
}
