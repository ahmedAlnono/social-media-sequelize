import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostProviders } from 'src/posts/post.provider';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, ...PostProviders],
  exports: [CommentsService],
})
export class CommentsModule {}
