import { RiskLevel } from './risk.entity';

export const RiskMap: Record<RiskLevel, number> = {
  [RiskLevel.LOW]: 10,
  [RiskLevel.MEDIUM]: 30,
  [RiskLevel.HIGH]: 50,
};