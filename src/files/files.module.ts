import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'src/db/database.module';
import { PostProviders } from 'src/posts/post.provider';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: './src/files/uploads',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, ...PostProviders],
})
export class FilesModule {}
