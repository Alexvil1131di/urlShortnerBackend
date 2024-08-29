// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUsrUrlDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'string' })
  userId: string;

  @ApiProperty({ example: 'string' })
  key: string;

  @ApiProperty({ example: 'string' })
  longUrl: string;
}
