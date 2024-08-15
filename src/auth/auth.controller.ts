import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {

  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @Post('logIn')
  async logIn(@Body() userCredentials: LogInDto) {
    const user = await this.authService.getOneByEmail(userCredentials.email);
    if (!user) throw new HttpException('whrong email or password', 401);
    const passwordMatch = bcrypt.compare(userCredentials.password, user.password);
    if (!passwordMatch) throw new HttpException('whrong email or password', 401);
    delete user.password;
    const access_token = await this.jwtService.signAsync(user);
    return { ...user, token: access_token };
  }

  @Post('refreshToken')
  async refreshToken(@Body() token: string) {
    const user = await this.jwtService.verifyAsync(token);
    const access_token = await this.jwtService.signAsync(user, { expiresIn: '1h' });
    return { ...user, token: access_token };
  }


}
