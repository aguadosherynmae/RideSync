import { IsEnum, IsInt } from 'class-validator';
import { ReportBy } from '../driver_violation.entity';

export class RecordDto {
    
  @IsInt()
  driverId: number;

  @IsInt()
  violationId: number;

  @IsEnum(ReportBy)
  report_by: ReportBy;
}
