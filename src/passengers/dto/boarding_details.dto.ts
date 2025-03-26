import { IsInt, IsEnum } from 'class-validator';
import { BoardStat } from '../boarding_details.entity';

export class BoardingDto {
  @IsInt()
  request_rideId: number;

  @IsInt()
  driverId: number;

  @IsEnum(BoardStat)
  board_stat: BoardStat;
}
