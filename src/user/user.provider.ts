import { USER_MODEL } from 'constants/constants';
import { User } from '../models/user.model';

export const userProviders = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
];
