import {
  Inject,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { COMMENT_MODEL } from 'constants/constants';
import { Comment } from 'src/models/comment.model';
import { UserPayload } from 'src/posts/dto/userIdentiti.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_MODEL)
    private comment: typeof Comment,
  ) {}
  async create(createCommentDto: CreateCommentDto, user: UserPayload) {
    const comment = await this.comment.create({
      ...createCommentDto,
      userId: user.sub,
    });
    return comment;
  }

  async findAll(id: number) {
    try {
      const comments: any = await this.comment.findAll({
        where: {
          postId: id,
        },
      });
      // for (let i = 0; i < comments.length; i++) {
      //   if (!comments[i].hasRebly) {
      //     continue;
      //   }
      //   const reblys = await this.findAllRebly(comments[i].id);
      //   const comment = comments[i];
      //   comments[i] = {
      //     comment,
      //     reblys,
      //   };
      // }
      return comments;
    } catch (e) {
      throw new BadRequestException('wrong id');
    }
  }

  async findAllRebly(id: number) {
    try {
      const comments = await this.comment.findAll({
        where: {
          reblyComentId: id,
        },
      });
      return comments;
    } catch (e) {
      throw new BadRequestException('wrong id');
    }
  }

  async edit(updateCommentDto: UpdateCommentDto, user: UserPayload) {
    try {
      await this.comment.update(
        {
          title: updateCommentDto.title,
          description: updateCommentDto.description,
          photots: updateCommentDto.photos,
        },
        {
          where: {
            id: updateCommentDto.id,
            userId: user.sub,
          },
        },
      );
      return true;
    } catch (e) {
      throw new ForbiddenException("cann't update comment");
    }
  }

  async remove(id: number) {
    try {
      await this.comment.destroy({
        where: {
          id,
        },
      });
      return 'comment is deleted';
    } catch (e) {
      throw new BadRequestException('wrong id');
    }
  }
}

// @Inject(POST_MODEL)
// private post: typeof Post,
// @Inject(USER_MODEL)
// private user: typeof User,
