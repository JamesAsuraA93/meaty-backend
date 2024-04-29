import { NestFactory } from '@nestjs/core';
import { SysLogModule } from './sys_log.module';

async function bootstrap() {
  const app = await NestFactory.create(SysLogModule);
  await app.listen(3000);
}
bootstrap();
