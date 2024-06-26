import { NestFactory } from '@nestjs/core';
import { UploadModule } from './upload.module';

// async function bootstrap() {
//   const app = await NestFactory.create(UploadModule);
//   await app.listen(3001);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthStrategy } from 'apps/auth/src/constants';

async function bootstrap() {
  const app = await NestFactory.create(UploadModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Meaty API UPLOAD')
    .setDescription('The Meaty API UPLOAD API description')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      AuthStrategy.JWT,
    )
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

  await app.listen(8006);
}
bootstrap();
