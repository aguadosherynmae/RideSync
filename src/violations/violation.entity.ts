import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reports } from './reports.entity';
import { Record } from './driver_violation.entity';

@Entity()
export class Violation  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  severity: number;

  //Relationship
  @OneToMany(() => Reports, (reports) => reports.violation, { cascade: true })
  reports: Reports[];

  @OneToMany(() => Record, (record) => record.violation, { cascade: true })
  record: Record[];
}