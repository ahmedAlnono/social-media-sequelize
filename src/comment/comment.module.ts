import { Module } from '@nestjs/common';
import { CommentGateway } from './comment.gateway';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [CommentsModule],
  providers: [CommentGateway],
})
export class CommentModule {}
