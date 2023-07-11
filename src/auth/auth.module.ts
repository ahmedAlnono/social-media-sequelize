import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { userProviders } from 'src/user/user.provider';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'supper-secret',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ...userProviders],
})
export class AuthModule {}
