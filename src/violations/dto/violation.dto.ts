import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class ViolationDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  severity: number;
}
