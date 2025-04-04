import { IsInt, IsEnum } from 'class-validator';
import { RiskLevel } from '../risk.entity';

export class RiskDto {
  @IsEnum(RiskLevel)
  risk_level: RiskLevel;

  @IsInt()
  value: number;
}
