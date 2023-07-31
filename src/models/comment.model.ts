import {
  Model,
  Table,
  Column,
  Scopes,
  ForeignKey,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Post } from './post.model';
import { User } from './user.model';

@Scopes(() => ({
  deleted: {
    where: {
      deletedAt: {
        [Op.ne]: null,
      },
    },
  },
  active: {
    where: {
      deletedAt: null,
    },
  },
}))
@Table({
  paranoid: true,
  underscored: true,
})
export class Comment extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: 'post_id',
  })
  postId: number;

  @ForeignKey(() => Comment)
  reblyComentId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: User;

  @HasMany(() => Comment)
  Replys: Comment[];

  @Column
  photos: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'has_reply',
  })
  hasReply: boolean;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  views: number;
}
