import {
  Model,
  Table,
  Column,
  DataType,
  IsEmail,
  Unique,
  Scopes,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Post } from './post.model';

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
export class User extends Model {
  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash: string;

  @Column
  avatar: string;

  @HasMany(() => Post)
  posts: Post[];

  @BeforeCreate
  static async hashPassword(user: User) {
    user.hash = await bcrypt.hash(user.hash, 12);
  }
}
