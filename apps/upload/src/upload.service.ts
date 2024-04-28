import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    console.log('file', file, 'path', path);
    return { file: file };
  }
}
