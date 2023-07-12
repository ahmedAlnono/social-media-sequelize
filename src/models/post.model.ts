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
import { User } from './user.model';
import { Comment } from './comment.model';

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
export class Post extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  userId: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  watches: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  edited: boolean;

  photos: string;

  set addWatche(value: any) {
    console.log(this.watches + 1);
    // this.setDataValue('watches', this.watches + 1);
  }
}
