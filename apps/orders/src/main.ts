import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthStrategy } from 'apps/auth/src/constants';

// async function bootstrap() {
//   const app = await NestFactory.create(OrdersModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  const config = new DocumentBuilder()
    .setTitle('Meaty API ORDERS')
    .setDescription('The Meaty API ORDERS description')
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

  await app.listen(8003);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
