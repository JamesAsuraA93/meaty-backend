import { Controller, Get } from '@nestjs/common';
import { SysLogService } from './sys_log.service';

@Controller()
export class SysLogController {
  constructor(private readonly sysLogService: SysLogService) {}

  @Get()
  getHello(): string {
    return this.sysLogService.getHello();
  }
}
