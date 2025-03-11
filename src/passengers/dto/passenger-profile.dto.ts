import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { DiscountType, Status } from '../passenger_profile.entity';

export class PassengerProfileDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  middle_name?: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsInt()
  age: number;

  @IsDateString()
  birth_date: Date;

  @IsEnum(DiscountType)
  discount_type: DiscountType;

  @IsString()
  @IsOptional()
  proof_img?: string;

  @IsString()
  @IsOptional()
  passenger_img?: string;

  @IsEnum(Status)
  status: Status;
}
