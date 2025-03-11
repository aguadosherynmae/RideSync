import { IsInt, IsEnum } from 'class-validator';
import { Status } from '../driver_status.entity';

export class DriverStatusDto {
  @IsInt()
  driverId: number;

  @IsEnum(Status)
  status: Status;
}
