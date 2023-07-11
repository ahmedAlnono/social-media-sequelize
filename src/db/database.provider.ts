import { Sequelize } from 'sequelize-typescript';
import { Comment } from 'src/models/comment.model';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'social_media',
      });
      sequelize.addModels([User, Post, Comment]);
      return sequelize;
    },
  },
];
