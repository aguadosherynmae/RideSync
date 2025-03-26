import { DriverProfile  } from 'src/drivers/driver_profile.entity';
import { PassengerProfile } from 'src/passengers/passenger_profile.entity';
import { Feedback } from 'src/feedbacks/feedback.entity';
import { Reports } from 'src/violations/reports.entity';
import { PassengerViolation } from 'src/violations/passenger_violation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { RequestRide } from 'src/passengers/request_ride.entity';

export enum UserRole {
  PASSENGER = 'passenger',
  DRIVER = 'driver',
  COOP = 'coop',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  // Common for all users
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Passenger-specific & Coop-specific
  @Column({ nullable: true })
  username?: string;

  // Relationships  
  @OneToOne(() => DriverProfile, (driverProfile) => driverProfile.user,  { cascade: true})
  driverProfile: DriverProfile;

  @OneToOne(() => PassengerProfile, (passengerProfile) => passengerProfile.user,  { cascade: true})
  passengerProfile: PassengerProfile;

  @OneToMany(() => Feedback, (feedback) => feedback.user, { cascade: true })
  feedback: Feedback[];

  @OneToMany(() => Reports, (reports) => reports.user, { cascade: true })
  reports: Reports[];

  @OneToMany(() => PassengerViolation, (passenger_violation) => passenger_violation.user, { cascade: true })
  passenger_violation: PassengerViolation[];

  @OneToMany(() => RequestRide, (request) => request.user, { cascade: true })
  request: RequestRide[];

}