import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth-guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true,  forbidNonWhitelisted: true, skipUndefinedProperties: true,}),
  );

  app.useGlobalGuards(
    new AuthGuard(new JwtService(), new Reflector())
  );

  app.enableCors(
    {
      origin: ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }
  );

  await app.listen(3000);
}
bootstrap();
