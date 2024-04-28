import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('files')
@ApiTags('Files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {
    //
  }

  @Get()
  getHello(): string {
    return this.uploadService.getHello();
  }

  @Get(':path')
  seeUploadedFile(@Param('path') path: string, @Res() res) {
    return res.sendFile(path, { root: './' });
  }

  // @Roles('admin', 'partner', 'buyer')
  // @UseGuards(AuthGuard(AuthStrategy.JWT), RolesGuard)
  @Post('upload')
  @ApiOperation({ summary: 'upload ไฟล์เดียว' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        basket: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(
    @Res() res,
    @Param('path') path: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return res.json(await this.uploadService.uploadFile(file, path));
  }
  // async SignleFile(@UploadedFile() file: Express.Multer.File) {
  //   return { file: file };
  // }
  // async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File) {
  //   return res.json(await this.uploadService.uploadFile(file));
  // }

  @Post('/uploads')
  @ApiOperation({ summary: 'upload หลายไฟล์' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files')) // 👈  using FilesInterceptor here
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        basket: {
          type: 'string',
        },
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return { file: files };
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'ลบไฟล์' })
  async deleteFile(@Param('path') path: string, @Res() res) {
    res.softDeleteFile(path, { root: './' });
    return {
      path: path,
    };
  }
}
