import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({example: 'email@gmail.com',})
  email?: string;

  @ApiProperty({example: 'string',})
  firstName?: string;

  @ApiProperty({example: 'string',})
  lastName?: string;

  @ApiProperty({example: 'string',})
  password?: string;

  @ApiProperty({example: 'True',})
  isActive?: boolean;

  @ApiProperty({example: 'https//urlImage',})
  profileImage?: string;
}
