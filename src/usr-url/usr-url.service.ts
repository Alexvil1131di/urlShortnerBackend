import { Injectable } from '@nestjs/common';
import { CreateUsrUrlDto } from './dto/create-usr-url.dto';
import { UpdateUsrUrlDto } from './dto/update-usr-url.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsrUrlService {
  constructor(private prisma: PrismaService) {}

  create(createUsrUrlDto: CreateUsrUrlDto) {
    return this.prisma.userUrl.create({ data: createUsrUrlDto });
  }

  findAll() {
    return this.prisma.userUrl.findMany( {where: { deletedAt: null }});
  }

  findOne(id: string) {
    return this.prisma.userUrl.findUnique({ where: { id, deletedAt: null } });
  }

  findOneByKey(key: string) {
    return this.prisma.userUrl.findFirst( { where: { key, deletedAt: null } });
  }

  findOneByLongUrl(longUrl: string) {
    return this.prisma.userUrl.findUnique( { where: { longUrl, deletedAt: null } });
  }

  update(id: string, updateUsrUrlDto: UpdateUsrUrlDto) {
    return this.prisma.userUrl.update({ where: { id, deletedAt: null }, data: updateUsrUrlDto });
  }

  remove(id: string) {
    return this.prisma.userUrl.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
