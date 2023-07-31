import { Model, Table, Column, Scopes, ForeignKey } from 'sequelize-typescript';
import { Op } from 'sequelize';
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
export class Notification extends Model {
  @Column
  message: string;

  @ForeignKey(() => User)
  userId: User;
}
