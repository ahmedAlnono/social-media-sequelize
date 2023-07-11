import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = context.getType().toString();
    const token = this.extractTokenFromHeader(context);
    const noAuth = this.reflector.get('noAuth', context.getHandler());
    if (noAuth) {
      return true;
    }
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('AUTH_SECRET'),
      });
      const request = context.switchToHttp().getRequest();
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(
    context: ExecutionContext,
  ): string | undefined {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request?.headers?.authorization;
    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const [type, token] = authorizationHeader.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    }
    return undefined;
  }
}
