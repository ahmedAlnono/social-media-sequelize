import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserIdentity = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return await request.user;
  },
);
