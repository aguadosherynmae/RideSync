import { User } from 'src/auth/user.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class PassengerViolation {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @ManyToOne(() => User, (user) => user.passenger_violation, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'userId' })
  user: User;
  @ManyToOne(() => DriverProfile, (driver) => driver.passenger_violation, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'driverId' })
  driver: DriverProfile;

  @Column()
  violation: string;
}