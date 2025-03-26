import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class PaymentDto {
  @IsInt()
  boardingId: number;

  @IsInt()
  fareId: number;

  @IsInt()
  @IsOptional()
  discountId: number;

  @IsInt()
  cardId: number;

  @IsInt()
  @IsNotEmpty()
  amount_paid: number;

  @IsString()
  @IsNotEmpty()
  ref_num: string;
}
