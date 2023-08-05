import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { PostService } from './post.service';
import { Server, Socket } from 'socket.io';
import { socketMiddleware } from './ws.mw';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { UserIdentity } from 'src/users/user-identity.decorator';
import { UserPayload } from 'src/posts/dto/userIdentiti.dto';
import { FindPostDto } from 'src/posts/dto/find-post.dto';

@WebSocketGateway(8080, {
  namespace: 'post',
})
export class PostGateway {
  constructor(private readonly postService: PostService) {}
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    client.use(socketMiddleware(client) as any);
  }

  @SubscribeMessage('create')
  create(client: Socket) {
    this.server.emit('new message', 'test new message');
    console.log('the code work well');
    return 'the code work well';
  }

  @SubscribeMessage('findAll')
  async findAll() {
    return await this.postService.findAll();
  }

  @SubscribeMessage('update')
  async updatePost(
    @MessageBody() data: UpdatePostDto,
    @UserIdentity() user: UserPayload,
  ) {
    this.server.emit('postUpdated', data);
    return await this.postService.update(data, user);
  }

  @SubscribeMessage('delete')
  async deletePost(
    @UserIdentity() user: UserPayload,
    @MessageBody() data: FindPostDto,
  ) {
    this.server.emit('postDeleted', data.id);
    return await this.postService.remove(data, user);
  }
}
