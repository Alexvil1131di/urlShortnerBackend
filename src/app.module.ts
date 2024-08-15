import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UsrUrlModule } from './usr-url/usr-url.module';

@Module({
  imports: [AuthModule, UserModule, UsrUrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
