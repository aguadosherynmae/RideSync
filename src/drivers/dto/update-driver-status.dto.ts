import { IsEnum } from 'class-validator';
import { Status } from '../driver_status.entity';

export class DriverStatusDto {
  @IsEnum(Status)
  status: Status;
}
