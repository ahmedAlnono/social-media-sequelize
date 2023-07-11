import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
        user: createPostDto.user,
        photos,
      });
      return posts;
    } catch (e) {
      throw new BadRequestException('wrong data');
    }
  }

  async findAll() {
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
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
