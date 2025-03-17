import { IsString, IsInt, MaxLength } from 'class-validator';

export class FeedbackDto {
  @IsInt()
  userId: number;

  @IsInt()
  driverId: number;

  @IsInt()
  rating: number;

  @IsString()
  @MaxLength(500)
  message: string;
}
