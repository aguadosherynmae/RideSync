import { IsEmail, IsEnum, IsString, IsNotEmpty, MinLength, ValidateIf, IsNumber, IsOptional } from 'class-validator';
import { UserRole } from '../user.entity';

export class RegisterDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  // Passenger & Coop
  @ValidateIf((o) => o.role === UserRole.PASSENGER || o.role === UserRole.COOP)
  @IsString()
  @IsNotEmpty()
  username ?: string;

  // Driver 
  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsString()
  @IsNotEmpty()
  middle_name: string;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsString()
  @IsNotEmpty()
  route: string;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsString()
  @IsNotEmpty()
  plate_number: string;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsString()
  @IsNotEmpty()
  license_no: string;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsString()
  @IsNotEmpty()
  cell_num: string;

  @ValidateIf((o) => o.role === UserRole.DRIVER)
  @IsOptional()
  driver_img?: string;
}
