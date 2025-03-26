import { IsString, IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { State } from '../request_ride.entity';

export class RequesDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsEnum(State)
  state: State;
}
