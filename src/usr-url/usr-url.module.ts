import { Module } from '@nestjs/common';
import { UsrUrlService } from './usr-url.service';
import { UsrUrlController } from './usr-url.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsrUrlController],
  providers: [UsrUrlService, PrismaService],
})
export class UsrUrlModule {}
