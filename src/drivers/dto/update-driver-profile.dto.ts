import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateDriverProfileDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  middle_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  route: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  plate_number: string;

  @IsString()
  @IsNotEmpty()
  license_no: string;

  @IsString()
  @IsNotEmpty()
  cell_num: string;

  @IsString()
  @IsOptional()
  driver_img?: string;
}
