import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { CommentsService } from 'src/comments/comments.service';
import { UserIdentity } from 'src/users/user-identity.decorator';
import { UserPayload } from 'src/posts/dto/userIdentiti.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';

@WebSocketGateway(8080, {
  namespace: 'comment',
})
export class CommentGateway {
  constructor(private readonly commentService: CommentsService) {}
  server: Server;

  @SubscribeMessage('createComment')
  async create(
    @MessageBody() data: CreateCommentDto,
    @UserIdentity() user: UserPayload,
  ) {
    await this.commentService.create(data, user);
    this.server.emit('comment created', data);
    return true;
  }

  @SubscribeMessage('editComment')
  async edit(
    @MessageBody() data: UpdateCommentDto,
    @UserIdentity() user: UserPayload,
  ) {
    await this.commentService.edit(data, user);
    this.server.emit('commentUpdated', {
      ...data,
    });
  }

  @SubscribeMessage('delete')
  async delete(@UserIdentity() user: UserPayload, @MessageBody() data: number) {
    const isDeleted = await this.commentService.remove(data, user);
    if (isDeleted) {
      this.server.emit('commentDeleted', data);
      return true;
    }
  }
}
