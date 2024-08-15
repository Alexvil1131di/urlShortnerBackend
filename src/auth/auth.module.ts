import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

const jwtConfig = JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [jwtConfig],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
})
export class AuthModule {}
