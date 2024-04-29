import { Test, TestingModule } from '@nestjs/testing';
import { SysLogController } from './sys_log.controller';
import { SysLogService } from './sys_log.service';

describe('SysLogController', () => {
  let sysLogController: SysLogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SysLogController],
      providers: [SysLogService],
    }).compile();

    sysLogController = app.get<SysLogController>(SysLogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sysLogController.getHello()).toBe('Hello World!');
    });
  });
});
