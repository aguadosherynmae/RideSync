import { IsString, IsNotEmpty, IsInt, IsEnum, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class DiscountDto {
  @IsInt()
  @IsNotEmpty()
  discount_amount: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  expire_date: Date;

  @IsInt()
  @IsOptional()
  recordId:number;
}
