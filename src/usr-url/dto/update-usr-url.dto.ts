import { PartialType } from '@nestjs/mapped-types';
import { CreateUsrUrlDto } from './create-usr-url.dto';

export class UpdateUsrUrlDto extends PartialType(CreateUsrUrlDto) {}
