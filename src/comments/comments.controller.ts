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

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get(':id')
  findAll(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentsService.findAll(id);
  }

  @Post('/update')
  edit(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.edit(updateCommentDto);
  }

  @Get('reblys')
  findAllRebly(@Body() id: FindCommentDto) {
    return this.commentsService.findAllRebly(id.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
