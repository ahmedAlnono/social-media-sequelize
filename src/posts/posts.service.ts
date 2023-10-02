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
import { UserPayload } from './dto/userIdentiti.dto';
import { FindPostConditionally } from './dto/find-posts-conditionally.dto';
import { Sequelize } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_MODEL) private post: typeof Post,
    @Inject(USER_MODEL) private user: typeof User,
  ) {}
  async create(
    createPostDto: CreatePostDto,
    files: Express.Multer.File[],
    user: UserPayload,
  ) {
    try {
      // const posts = await this.post.findAll({
      //   where: {
      //     userId: user.sub,
      //   },
      //   order: [['id', 'DESC']],
      //   limit: 5,
      // });
      // const postTime = posts[posts.length - 1].createdAt;
      // const nowDate = new Date();
      // const time = nowDate.getTime() - postTime.getTime();
      // const timeDifferenceInDays = Math.floor(time / (1000 * 60 * 60 * 24));
      const timeDifferenceInDays = await this.checkDate(user.sub);
      if (timeDifferenceInDays >= 1) {
        const FileNames = [];
        let photos = '';
        if (files) {
          for (let i = 0; i < files.length; i++) {
            FileNames.push(files[i].filename);
          }
          photos = FileNames.join(' ');
        } else {
          photos = null;
        }
        const post = await this.post.create({
          title: createPostDto.title,
          description: createPostDto.description,
          userId: user.sub,
          photos,
        });
        return post;
      } else {
        throw new BadRequestException('user can create just 5 post per day');
      }
    } catch (e) {
      throw new BadRequestException('wrong data');
    }
  }
  async checkDate(userId: number) {
    const posts = await this.post.findAll({
      where: {
        userId,
      },
      limit: 5,
      order: [['id', 'DESC']],
    });
    const postTime = posts[posts.length - 1].createdAt;
    const nowDate = new Date();
    const time = nowDate.getTime() - postTime.getTime();
    const timeDifferenceInDays = Math.floor(time / (1000 * 60 * 60 * 24));

    return timeDifferenceInDays;
  }

  async findAll() {
    try {
      const query = `
      SELECT * FROM (
        SELECT id, title, user_id, watches, edited, photos FROM posts
        ORDER BY id DESC
        LIMIT 500
      ) AS RANDOM_OUTPUT
      ORDER BY RAND()
      LIMIT 100;
    `;
      const [posts] = (await this.post.sequelize.query(query)) as any;
      for (let i = 0; i < posts['length']; i++) {
        await this.post.update(
          {
            watches: posts[i].watches + 1,
          },
          {
            where: {
              id: posts[i].id,
            },
          },
        );
      }
      return posts;
    } catch (e) {
      throw new ForbiddenException('try again');
    }
  }

  async findConditionally(conditions: FindPostConditionally) {
    let postsOrder = '';
    if (conditions.newToOld) {
      postsOrder = 'DESC';
    } else {
      postsOrder = 'ASC';
    }
    const posts = await this.post.findAll({
      order: [['id', postsOrder]],
      limit: conditions.limit || 15,
      offset: conditions.offset || 0,
    });
    return posts;
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

  async update(updatePostDto: UpdatePostDto, user: UserPayload) {
    try {
      const post = await this.post.findByPk(updatePostDto.id);
      if (+post.userId == user.sub) {
        if (updatePostDto.title) {
          await post.$set('title', updatePostDto.title);
        }
        if (updatePostDto.description) {
          await post.$set('description', updatePostDto.description);
        }
        return true;
      } else {
        throw new BadRequestException('not your post');
      }
    } catch (e) {
      throw new ForbiddenException('unknown error');
    }
  }

  async remove(findPostDto: FindPostDto, user: UserPayload) {
    try {
      await this.post.destroy({
        where: {
          id: findPostDto.id,
          userId: user.sub,
        },
      });
      return true;
    } catch (e) {
      throw new BadRequestException('wrong id');
    }
  }

  async findUserPosts(id: number) {
    const posts = await this.post.findAll({
      where: {
        userId: id,
      },
      order: [['createdAt', 'DESC']],
      limit: 20,
    });
    return posts;
  }
}
