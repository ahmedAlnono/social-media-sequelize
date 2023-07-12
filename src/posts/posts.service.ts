import { FindPostDto } from './dto/find-post.dto';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_MODEL, USER_MODEL } from 'constants/constants';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_MODEL)
    private post: typeof Post,
    @Inject(USER_MODEL)
    private user: typeof User,
  ) {}
  async create(createPostDto: CreatePostDto, files: Express.Multer.File[]) {
    try {
      const FileNames = [];
      for (let i = 0; i < files.length; i++) {
        FileNames.push(files[i].filename);
      }
      const photos = FileNames.join(' ');
      const posts = await this.post.create({
        title: createPostDto.title,
        description: createPostDto.description,
        userId: createPostDto.userId,
        photos,
      });
      return posts;
    } catch (e) {
      throw new BadRequestException('wrong data');
    }
  }

  async findAll() {
    try {
      const query = `
      SELECT * FROM (
        SELECT * FROM posts
        ORDER BY id DESC
        LIMIT 500
      ) AS RANDOM_OUTPUT
      ORDER BY RAND()
      LIMIT 100;
    `;
      const [posts] = await this.post.sequelize.query(query);
      return posts;
    } catch (e) {
      throw new ForbiddenException('try again');
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.post.findByPk(id);
      await post.$set('watches', post.watches + 1);
      return post;
    } catch (e) {
      throw new BadRequestException('wrong id');
    }
  }

  async update(updatePostDto: UpdatePostDto) {
    try {
      const post = await this.post.findByPk(updatePostDto.id);
      if (updatePostDto.title) {
        await post.$set('title', updatePostDto.title);
      }
      if (updatePostDto.description) {
        await post.$set('description', updatePostDto.description);
      }
      return true;
    } catch (e) {
      throw new ForbiddenException('unknown error');
    }
  }

  async remove(findPostDto: FindPostDto) {
    try {
      await this.post.destroy({
        where: {
          id: findPostDto.id,
        },
      });
      return true;
    } catch (e) {
      throw new BadRequestException('wrong id');
    }
  }
}
