import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80, {
    message: 'title is too long',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  postId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  replyComentId?: number;
}
