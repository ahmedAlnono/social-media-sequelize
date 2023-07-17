import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_MODEL } from 'constants/constants';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
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
}
