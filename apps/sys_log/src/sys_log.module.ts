import { Module } from '@nestjs/common';
import { SysLogController } from './sys_log.controller';
import { SysLogService } from './sys_log.service';

@Module({
  imports: [],
  controllers: [SysLogController],
  providers: [SysLogService],
})
export class SysLogModule {}
