import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { COMMENT_MODEL } from 'constants/constants';
import { Comment } from 'src/models/comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_MODEL)
    private comment: typeof Comment,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.comment.create({
      ...createCommentDto,
    });
    return comment;
  }

  async findAll(id: number) {
    const comments: any = await this.comment.findAll({
      where: {
        postId: id,
      },
    });
    for (let i = 0; i < comments.length; i++) {
      if (!comments[i].hasRebly) {
        continue;
      }
      const reblys = await this.findAllRebly(comments[i].id);
      const comment = comments[i];
      comments[i] = {
        comment,
        reblys,
      };
    }
    return comments;
  }

  async findAllRebly(id: number) {
    const comments = await this.comment.findAll({
      where: {
        reblyComentId: id,
      },
    });
    return comments;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

// @Inject(POST_MODEL)
// private post: typeof Post,
// @Inject(USER_MODEL)
// private user: typeof User,
