import { IsNumber, IsPositive } from 'class-validator';

export class FindPostDto {
  @IsNumber()
  @IsPositive()
  id: number;
}
