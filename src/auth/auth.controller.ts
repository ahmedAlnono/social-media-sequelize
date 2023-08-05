import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindeUserDto } from 'src/users/dto/find-user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/users/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signin(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: FindeUserDto) {
    return this.authService.signin(signInDto);
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req: Request) {
    return req['user'];
  }

  @Get('profile')
  profile(@Req() req: Request) {
    return req['user'];
  }
}
