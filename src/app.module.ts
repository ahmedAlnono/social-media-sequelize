import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './db/database.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    PostsModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    CommentsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useValue: GlobalAuthGuard,
    },
  ],
})
export class AppModule {}
