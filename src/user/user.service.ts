import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { NOTIFICATION_MODEL, USER_MODEL } from 'constants/constants';
import { User } from 'src/models/user.model';
import { Notification } from 'src/models/notification.model';
import { userJwtPayload } from './dto/user-jwt-paylaod.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    @Inject(NOTIFICATION_MODEL)
    private notification: typeof Notification,
  ) {}

  async findOne(id: number) {
    return await this.user.findByPk(id, {
      attributes: ['name', 'email'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.user.update(
        {
          ...updateUserDto,
        },
        {
          where: {
            id,
          },
        },
      );
      return true;
    } catch (e) {
      throw new BadGatewayException('user not found');
    }
  }

  async remove(id: number) {
    try {
      await this.user.destroy({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      throw new BadGatewayException('user not found');
    }
  }

  async findNotification(user: userJwtPayload) {
    const notifications = await this.notification.findAll({
      where: {
        userId: user.sub,
      },
    });
    return notifications;
  }
}
