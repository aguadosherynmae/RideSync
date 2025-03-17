import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RiskLevel {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
  }

@Entity()
export class Risk  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum:  RiskLevel})
  risk_level: RiskLevel;

  @Column()
  value: number;
}