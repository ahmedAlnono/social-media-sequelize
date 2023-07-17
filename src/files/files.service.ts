import { Inject, Injectable } from '@nestjs/common';
import { POST_MODEL } from 'constants/constants';
import { Post } from 'src/models/post.model';

@Injectable()
export class FilesService {
  constructor(
    @Inject(POST_MODEL)
    private post: typeof Post,
  ) {}

  // async uploadPhotos(id: number, fileNames: Express.Multer.File[]) {
  //   try {
  // const post = await this.post.findByPk(id);
  // for (let i = 0; i < fileNames.length; i++) {
  //   console.log(fileNames[i].filename);
  //   const photo = await this.photos.create({
  //     photoId: fileNames[i].filename,
  //     post: id,
  //   });
  //   post.$add('photos', photo);
  // }
  // return post;
  //   } catch (e) {
  //     throw new BadRequestException('photo not allowed');
  //   }
  // }
}
