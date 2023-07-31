import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from './public.decorator';
import { UserIdentity } from './user-identity.decorator';
import { userJwtPayload } from './dto/user-jwt-paylaod.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('notification')
  getNotification(@UserIdentity() user: userJwtPayload) {
    return this.userService.findNotification(user);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
