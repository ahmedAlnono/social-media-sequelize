import { IsNumber, IsPositive, IsOptional, IsBoolean } from 'class-validator';
export class FindPostConditionally {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number;

  @IsBoolean()
  @IsOptional()
  newToOld?: boolean;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset: number;
}
