import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
  });
  app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      saveUninitialized: false,
      resave: false,
      name: 'session',
    }),
  );
  app.use(cookieParser(process.env.COOKIES_SECRET));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
  console.log(`http://localhost:${port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
