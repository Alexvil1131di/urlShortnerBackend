// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'string' })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    },
  )
  password: string;

  @ApiProperty({ example: 'True' })
  @IsBoolean()
  @IsEmpty()
  isActive?: boolean;

  @ApiProperty({ example: 'https//urlImage' })
  @IsUrl()
  @IsEmpty()
  profileImage?: string;
}
