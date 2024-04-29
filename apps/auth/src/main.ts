import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthStrategy } from './constants';

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
    .setTitle('Meaty API AUTH')
    .setDescription('The Meaty API AUTH description')
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

  await app.listen(8001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
