import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient();
    const { authorization } = client.handshake.headers;
    const noAuth = this.reflector.get('noAuth', context.getHandler());
    if (noAuth) {
      return true;
    }
    if (context.getType() !== 'ws') {
      return true;
    }
    if (!authorization) {
      return false;
    }
    WsJwtGuard.ValidateToken(client);
    return true;
  }

  static async ValidateToken(client: Socket) {
    const { authorization }: any = client.handshake.headers;
    const token: string = authorization.split(' ')[1];
    const payload = verify(token, 'supper-secret');
    client['user'] = payload;
    console.log(payload);
    return payload;
  }
}
