import { PartialType } from '@nestjs/swagger';
import { UploadFileDto } from './upload-file.dto';
// import { CreateFileDto } from './upload-file.dto';

export class UpdateFileDto extends PartialType(UploadFileDto) {
  //
}
