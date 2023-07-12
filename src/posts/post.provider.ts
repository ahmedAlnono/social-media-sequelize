import { COMMENT_MODEL, POST_MODEL, USER_MODEL } from 'constants/constants';
import { User } from '../models/user.model';
import { Post } from 'src/models/post.model';
import { Comment } from 'src/models/comment.model';

export const PostProviders = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
  {
    provide: POST_MODEL,
    useValue: Post,
  },
  {
    provide: COMMENT_MODEL,
    useValue: Comment,
  },
];
