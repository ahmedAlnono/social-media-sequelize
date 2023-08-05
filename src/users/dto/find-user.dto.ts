import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class FindeUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsPositive()
  id: number;
}
