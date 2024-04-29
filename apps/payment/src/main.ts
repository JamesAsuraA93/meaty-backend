import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(PaymentModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  const config = new DocumentBuilder()
    .setTitle('Meaty API PAYMENT')
    .setDescription('The Meaty API PAYMENT description')
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

  await app.listen(8004);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
