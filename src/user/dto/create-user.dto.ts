// eslint-disable-next-line prettier/prettier
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsStrongPassword(
    { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.' },
  )
  password: string;

  @IsBoolean()
  @IsEmpty()
  isActive?: boolean;

  @IsString()
  @IsEmpty()
  profileImage?: string;
}
