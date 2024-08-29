import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUsrUrlDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  longUrl: string;
}

export class AddUrlDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'string' })
  @IsUrl()
  @IsNotEmpty()
  longUrl: string;
}
