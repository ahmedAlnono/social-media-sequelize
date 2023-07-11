import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_MODEL } from 'constants/constants';
import { User } from 'src/models/user.model';
import sequelize from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const query = `
  SELECT * FROM (
    SELECT * FROM users
    ORDER BY id DESC
    LIMIT 20
  ) AS RANDOM_OUTPUT
  ORDER BY RAND()
  LIMIT 5;
`;
    const users = await this.user.sequelize.query(query);
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
