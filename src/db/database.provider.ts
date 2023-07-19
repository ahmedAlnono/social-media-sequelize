import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Comment } from 'src/models/comment.model';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
      });
      sequelize.addModels([User, Post, Comment]);
      return sequelize;
    },
  },
];
