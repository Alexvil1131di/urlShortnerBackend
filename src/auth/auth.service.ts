import { Injectable } from '@nestjs/common';
import { LogInDto } from './dto/logIn-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  getOneByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: { email, isActive: true, deletedAt: null },
      select: { id: true, email: true, firstName: true, lastName: true,
        isActive: true, profileImage: true, userUrl: true, password: true
      },
    });
    return user;
  }


}
