import { Injectable } from '@nestjs/common';

@Injectable()
export class SysLogService {
  getHello(): string {
    return 'Hello World!';
  }
}
