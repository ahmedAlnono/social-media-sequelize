import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UserService } from './user.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService) {}
  server: Server;
}
