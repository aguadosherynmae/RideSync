import { IsInt, IsEnum, ValidateIf, IsNotEmpty, IsString } from 'class-validator';
import { State } from '../bus.entity';

export class BusDto {
  @IsInt()
  driverId: number;

  @IsEnum(State)
  state: State;

  @ValidateIf((o) => o.state === State.RED || o.state === State.RED)
  @IsNotEmpty()
  @IsString()
  issue_description?: String;
}
