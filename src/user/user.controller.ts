// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/reponse-user.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: ResponseUserDto,
  })
  async create(@Body() user: CreateUserDto) {
    const userExists = await this.userService.getOneByEmail(user.email);

    if (userExists) throw new HttpException('User already exists', 400);

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));

    const hashedPassword = await bcrypt.hash(user.password, salt);

    return this.userService.create({ ...user, password: hashedPassword });
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Users retrieved',
    type: [ResponseUserDto],
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'User retrieved',
    type: ResponseUserDto,
  })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'User updated',
    type: ResponseUserDto,
  })
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'User deleted',
    type: ResponseUserDto,
  })
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new HttpException('User not found', 404);
    return this.userService.remove(id);
  }
}
