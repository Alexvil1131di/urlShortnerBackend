// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';
import { ResponseUsrUrlDto } from 'src/usr-url/dto/reponse-usr-url.dto';

export class ResponseUserDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: 'string' })
  firstName: string;

  @ApiProperty({ example: 'string' })
  lastName: string;

  @ApiProperty({ example: 'True' })
  isActive?: boolean;

  @ApiProperty({ example: 'https//urlImage' })
  profileImage?: string;

  @ApiProperty({ type: [ResponseUsrUrlDto] })
  userUrl?: ResponseUsrUrlDto[];
}
