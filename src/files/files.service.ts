import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { POST_MODEL } from 'constants/constants';
import { Post } from 'src/models/post.model';
import { UserPayload } from 'src/posts/dto/userIdentiti.dto';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';

@Injectable()
export class FilesService {
  constructor(@Inject(POST_MODEL) private post: typeof Post) {}

  async uploadPhotos(
    id: number,
    fileNames: Express.Multer.File[],
    user: UserPayload,
  ) {
    try {
      const post = await this.post.findByPk(id);
      if (+user.sub !== +post.userId) {
        throw new BadRequestException("user cann't edit this post");
      }
      const photos = [];
      for (let i = 0; i < fileNames.length; i++) {
        photos.push(`${fileNames[i].filename} `);
      }
      post.$add('photos', photos);
      return true;
    } catch (e) {
      throw new BadRequestException('photo not allowed');
    }
  }
  async createPost(post: CreatePostDto, photo: Express.Multer.File) {
    const newPost = await this.post.create({
      title: post.title,
      description: post.description,
      photos: photo.filename,
    });
    if (!newPost) {
      throw new BadRequestException('post not created');
    }
    return true;
  }
}
