import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostProviders } from './post.provider';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/files/uploads',
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, ...PostProviders],
})
export class PostsModule {}
