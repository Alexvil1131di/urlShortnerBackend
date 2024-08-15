import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(user: CreateUserDto) {
    const newUser = this.prisma.user.create({ data: user });
    return newUser;
  }

  findAll() {
    const users = this.prisma.user.findMany({
      where: { isActive: true, deletedAt: null },
      select: { id: true, email: true, firstName: true, lastName: true,
        isActive: true, profileImage: true, userUrl: true
      },
    });
    return users;
  }

  findOne(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id, isActive: true, deletedAt: null },
      select: { id: true, email: true, firstName: true, lastName: true,
        isActive: true, profileImage: true, userUrl: true 
      },
    });
    return user;
  }

  getOneByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: { email, isActive: true, deletedAt: null },
      select: { id: true, email: true, firstName: true, lastName: true,
        isActive: true, profileImage: true, userUrl: true 
      },
    });
    return user;
  }

  update(id: string, user: UpdateUserDto) {
    const updatedUser = this.prisma.user.update({ 
      where: { id, deletedAt: null }, 
      select: { id: true, email: true, firstName: true, lastName: true,
        isActive: true, profileImage: true, userUrl: true 
      },
      data: user 
    });
    return updatedUser;
  }

  remove(id: string) {
    const deletedUser = this.prisma.user.update({
      where: { id },
      data: { isActive: false, deletedAt: new Date() },
    });
    return deletedUser;
  }
}
