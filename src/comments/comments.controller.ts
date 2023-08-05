import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindCommentDto } from './dto/find-comment.dto';
import { UserIdentity } from 'src/users/user-identity.decorator';
import { UserPayload } from 'src/posts/dto/userIdentiti.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @UserIdentity() user: UserPayload,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(createCommentDto, user);
  }

  @Get(':id')
  findAll(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentsService.findAll(id);
  }

  @Post('/update')
  edit(
    @UserIdentity() user: UserPayload,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.edit(updateCommentDto, user);
  }

  @Get('replys')
  findAllRebly(@Body() id: FindCommentDto) {
    return this.commentsService.findAllReplies(id.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserIdentity() user: UserPayload) {
    return this.commentsService.remove(+id, user);
  }
}
