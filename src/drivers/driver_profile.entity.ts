import { User } from 'src/auth/user.entity';
import { DriverStatus } from './driver_status.entity';
import { Feedback } from 'src/feedbacks/feedback.entity';
import { Reports } from 'src/violations/reports.entity';
import { Record } from 'src/violations/driver_violation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
  
@Entity()
export class DriverProfile  {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @OneToOne(() => User, (user) => user.driverProfile , { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'userId' })
  user: User;
  @OneToOne(() => DriverStatus, (driverStatus) => driverStatus.driver_profile,  { cascade: true})
  driverStatus: DriverStatus;
  @OneToMany(() => Feedback, (feedback) => feedback.driver, { cascade: true })
  feedback: Feedback[];
  @OneToMany(() => Reports, (reports) => reports.driver, { cascade: true })
  reports: Reports[];
  @OneToMany(() => Record, (record) => record.violation, { cascade: true })
  record: Record[];

  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;

  @Column()
  address: string;

  @Column()
  route: string;

  @Column()
  age: number;

  @Column()
  plate_number: string;

  @Column()
  license_no: string;

  @Column()
  cell_num: string;

  @Column({ nullable: true })
  driver_img?: string;
}