import { NestFactory } from '@nestjs/core';
import { SysLogModule } from './sys_log.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(SysLogModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(SysLogModule);

  const config = new DocumentBuilder()
    .setTitle('Meaty API SYS_LOG')
    .setDescription('The Meaty API SYS_LOG description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  await app.listen(8005);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
