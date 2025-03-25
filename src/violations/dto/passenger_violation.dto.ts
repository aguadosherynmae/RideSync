import { IsInt, IsString } from 'class-validator';

export class PassengerViolationDto {
    @IsInt()
    userId: number;
    
    @IsInt()
    driverId: number;

    @IsString()
    violation: string;
}
