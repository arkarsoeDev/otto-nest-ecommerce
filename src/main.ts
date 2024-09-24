import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // app.enableCors({
  //   origin: 'google.com',
  //   methods: ['get']
  // });

  app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensure the cookie is sent over HTTPS in production
        sameSite: 'none',  // Allow cross-origin requests with cookies
        maxAge: 3600000,  // Set the cookie expiration time (1 hour in this case)
      },
    })
  )

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Otto E-commerce API')
    .setDescription('Otto E-commerce api backend build with NestJS.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(3000);
}
bootstrap();
