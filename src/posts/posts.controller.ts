import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostDto } from './dto/find-post.dto';
import { Public } from 'src/users/public.decorator';
import { UserIdentity } from 'src/users/user-identity.decorator';
import { UserPayload } from './dto/userIdentiti.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @UserIdentity() user: UserPayload,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100000000 })],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.postsService.create(createPostDto, files, user);
  }

  @Public()
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch('')
  update(
    @UserIdentity() user: UserPayload,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(updatePostDto, user);
  }

  @Delete('')
  remove(@UserIdentity() user: UserPayload, @Body() findPostDto: FindPostDto) {
    return this.postsService.remove(findPostDto, user);
  }

  @Get('user')
  findUserPosts(@UserIdentity() user: UserPayload) {
    return this.postsService.findUserPosts(user.sub);
  }
}
