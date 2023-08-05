import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/models/user.model';
import { FindeUserDto } from 'src/users/dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { USER_MODEL } from 'constants/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    private jwt: JwtService,
  ) {}
  async signin(user: FindeUserDto) {
    try {
      const findeUser = await this.user.findOne({
        where: {
          id: user.id,
        },
        attributes: ['email', 'hash', 'id'],
      });
      if (findeUser) {
        const isMatch = await bcrypt.compare(user.password, findeUser.hash);
        if (isMatch) {
          return this.signToken(findeUser.id, findeUser.email, user.password);
        } else {
          throw new ForbiddenException('wrong password');
        }
      } else {
        throw new ForbiddenException('user not found');
      }
    } catch (e) {
      throw new BadRequestException('wrong user data');
    }
  }
  async signup(user: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      const create_user = await this.user.create({
        name: user.name,
        email: user.email,
        hash,
      });
      delete create_user.hash;
      return create_user;
    } catch (e) {
      throw new ForbiddenException('wrong user data');
    }
  }
  async signToken(userId: number, email: string, password: string) {
    const payload = {
      sub: userId,
      email,
      password,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: 'supper-secret',
    });
    return {
      access_token: token,
    };
  }
  async validateUser(sub: number, email: string, password): Promise<any> {
    const user = await this.user.findOne({
      where: {
        id: sub,
      },
    });
    if (user && (await bcrypt.compare(user.hash, password))) {
      return user;
    }
    return false;
  }
}
