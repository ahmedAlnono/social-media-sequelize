import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './db/database.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    PostsModule,
    AuthModule,
    UserModule,
    DatabaseModule.register('development'),
    CommentsModule,
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule {}
