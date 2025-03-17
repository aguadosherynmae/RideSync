import { User } from 'src/auth/user.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { Violation } from './violation.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Reports {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'userId' })
  user: User;
  @ManyToOne(() => DriverProfile, (driver) => driver.reports, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'driverId' })
  driver: DriverProfile;
  @ManyToOne(() => Violation, (violation) => violation.reports, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'violationId' })
  violation: Violation;
}