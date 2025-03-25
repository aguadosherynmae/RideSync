import { IsEmail, IsString, MinLength, ValidateIf, IsOptional } from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateDto {

  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  currentPassword?: string;

  @MinLength(6)
  @IsOptional()
  password: string;

  // Passenger & Coop
  @ValidateIf((o) => o.role === UserRole.PASSENGER || o.role === UserRole.COOP)
  @IsString()
  @IsOptional()
  username ?: string;

}
