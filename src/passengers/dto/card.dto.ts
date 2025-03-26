import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  card_number: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  expire_date: Date;

  @IsString()
  @IsNotEmpty()
  security_code: string;
}
