import { IsNumber, IsPositive } from 'class-validator';

export class FindCommentDto {
    @IsNumber()
    @IsPositive()
    id: number;
}