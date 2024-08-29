import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  getOneByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: { email, isActive: true, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        password: true,
        profileImage: true,
        userUrl: {
          select: { id: true, userId: true, key: true, longUrl: true },
        },
      },
    });
    return user;
  }
}
