import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AuthModule);
//   await app.listen(8001);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const config = new DocumentBuilder()
    .setTitle('Meaty API')
    .setDescription('The Meaty API description')
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

  await app.listen(8001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();