import { PartialType } from '@nestjs/mapped-types';
import { CreateUsrUrlDto } from './create-usr-url.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsrUrlDto extends PartialType(CreateUsrUrlDto) {
  @ApiProperty({ example: 'string' })
  userId: string;

  @ApiProperty({ example: 'string' })
  key: string;

  @ApiProperty({ example: 'string' })
  longUrl: string;
}
