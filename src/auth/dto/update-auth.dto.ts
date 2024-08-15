import { PartialType } from '@nestjs/mapped-types';
import { LogInDto } from './logIn-auth.dto';

export class UpdateAuthDto extends PartialType(LogInDto) {}
