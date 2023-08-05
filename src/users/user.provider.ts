import { NOTIFICATION_MODEL, USER_MODEL } from 'constants/constants';
import { User } from '../models/user.model';
import { Notification } from 'src/models/notification.model';

export const userProviders = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
  {
    provide: NOTIFICATION_MODEL,
    useValue: Notification,
  },
];
