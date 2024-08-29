import { Injectable } from '@nestjs/common';
import { CreateUsrUrlDto } from './dto/create-usr-url.dto';
import { UpdateUsrUrlDto } from './dto/update-usr-url.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsrUrlService {
  constructor(private prisma: PrismaService) {}

  create(createUsrUrlDto: CreateUsrUrlDto) {
    return this.prisma.userUrl.create({
      data: createUsrUrlDto,
      select: { id: true, userId: true, key: true, longUrl: true },
    });
  }

  findAll() {
    return this.prisma.userUrl.findMany({
      where: { deletedAt: null },
      select: { id: true, userId: true, key: true, longUrl: true },
    });
  }

  findAllByUserId(userId: string) {
    return this.prisma.userUrl.findMany({
      where: { deletedAt: null, userId: userId },
      select: { id: true, userId: true, key: true, longUrl: true },
    });
  }

  findOne(id: string) {
    return this.prisma.userUrl.findUnique({
      where: { id, deletedAt: null },
      select: { id: true, userId: true, key: true, longUrl: true },
    });
  }

  findOneByKey(key: string) {
    return this.prisma.userUrl.findFirst({
      where: { key, deletedAt: null },
      select: { id: true, userId: true, key: true, longUrl: true },
    });
  }

  findOneByLongUrl(longUrl: string, userId: string) {
    return this.prisma.userUrl.findFirst({
      where: { longUrl, deletedAt: null, userId },
      select: { id: true, userId: true, key: true, longUrl: true },
    });
  }

  update(id: string, updateUsrUrlDto: UpdateUsrUrlDto) {
    return this.prisma.userUrl.update({
      where: { id, deletedAt: null },
      select: { id: true, userId: true, key: true, longUrl: true },
      data: updateUsrUrlDto,
    });
  }

  remove(id: string) {
    return this.prisma.userUrl.update({
      where: { id },
      select: { id: true, userId: true, key: true, longUrl: true },
      data: { deletedAt: new Date() },
    });
  }
}
