import { IsInt } from 'class-validator';

export class ReportDto {
    @IsInt()
    userId: number;
    
    @IsInt()
    driverId: number;

    @IsInt()
    violationId: number;
}
