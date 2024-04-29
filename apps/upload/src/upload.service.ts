import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// @Injectable()
// export class AppService {
//   constructor(private prisma: PrismaService) {
//     //
@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {
    //
  }

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    console.log('file', file, 'path', path);
    return { file: file };
  }

  async seeUploadedFile(path: string) {
    return { path: path };
  }

  async createFile(file_detail: {
    filename: string;
    mimetype: string;
    path: string;
    size: number;
  }) {
    return await this.prisma.file.create({
      data: {
        encoding: '7bit',
        filename: file_detail.filename,
        mimetype: file_detail.mimetype,
        path: file_detail.path,
        size: file_detail.size,
      },
    });
  }
}
