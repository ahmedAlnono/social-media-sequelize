import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './db/database.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [PostsModule, AuthModule, UserModule, DatabaseModule, CommentsModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
