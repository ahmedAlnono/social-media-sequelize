import {
  BadRequestException,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('photos', {}))
  // upload(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 100000000 }),
  //         new FileTypeValidator({ fileType: 'image' }),
  //       ],
  //     }),
  //   )
  //   photos: Express.Multer.File[],
  // ) {
  //   return photos;
  // }

  // @Post('upload/thumbnail/:id')
  // @UseInterceptors(FileInterceptor('file', {}))
  // uploadThumbnail(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [new MaxFileSizeValidator({ maxSize: 100000000 })],
  //     }),
  //   )
  //   files: Express.Multer.File[],
  //   @Param('id', new ParseIntPipe())
  //   id: number,
  // ) {
  //   return this.filesService.uploadPhotos(id, files);
  // }

  @Get('get/:id')
  getFile(@Param('id') id: string) {
    try {
      const file = createReadStream(
        join(process.cwd(), `src/files/uploads/${id}`),
      );
      return new StreamableFile(file);
    } catch (e) {
      throw new BadRequestException('photo not found');
    }
  }
}
