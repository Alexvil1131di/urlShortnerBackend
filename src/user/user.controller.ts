// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const userExists = await this.userService.getOneByEmail(user.email);
    if (userExists) throw new HttpException('User already exists', 400);
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashedPassword = await bcrypt.hash(user.password,salt);
    return this.userService.create( {...user, password: hashedPassword } );
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    const userExist = await this.userService.findOne(id);
    if (!userExist) throw new HttpException('User not found', 404);
    if (user.password) {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
      user.password = await bcrypt.hash(user.password, salt);
    }
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new HttpException('User not found', 404);
    return this.userService.remove(id);
  }
}
