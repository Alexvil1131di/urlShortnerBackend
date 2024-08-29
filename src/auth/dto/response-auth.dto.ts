import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/reponse-user.dto';

export class ResponseAuthDto extends ResponseUserDto {
  @ApiProperty({ example: 'token' })
  token: string;
}
