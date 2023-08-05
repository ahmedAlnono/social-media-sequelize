import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostGateway } from './post.gateway';
import { PostProviders } from 'src/posts/post.provider';

@Module({
  providers: [PostGateway, PostService, ...PostProviders],
})
export class PostModule {}
