import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      name: process.env.SESSION_NAME || 'sid',
      secret: process.env.SESSION_SECRET || 'session-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: process.env.COOKIE_HTTPONLY == 'true' ? true : false,
        secure: process.env.COOKIE_SECURE == 'true' ? true : false,
        maxAge: parseInt(process.env.COOKIE_MAXAGE) || 1000 * 60 * 60 * 24 * 7, //1 week
      },
    }),
  );
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
