import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { Violation } from './violation.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToOne } from 'typeorm';
import { Discount } from 'src/passengers/discount.entity';

export enum ReportBy {
  SYSTEM = 'system',
  PASSENGERS = 'passengers',
  COOP = 'coop'
}

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @ManyToOne(() => DriverProfile, (driver) => driver.record, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'driverId' })
  driver: DriverProfile;
  @ManyToOne(() => Violation, (violation) => violation.record, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'violationId' })
  violation: Violation;
  @OneToOne(() => Discount, (discount) => discount.record,  { cascade: true})
  discount: Discount;

  @Column({ type: 'enum', enum:  ReportBy, default: ReportBy.PASSENGERS})
  report_by: ReportBy;  
}