import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
export class UpdateCommentDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  photos?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
