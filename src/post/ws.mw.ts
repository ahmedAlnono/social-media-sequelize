import { WsJwtGuard } from './ws-guard.guard';
import { Socket } from 'socket.io';

export const socketMiddleware = (client: Socket) => {
  return async (event: any, next: (err?: Error) => void) => {
    try {
      const isAuthorized = await WsJwtGuard.ValidateToken(client);
      if (isAuthorized) {
        next();
      } else {
        return false;
      }
    } catch (e) {
      next(e);
    }
  };
};
