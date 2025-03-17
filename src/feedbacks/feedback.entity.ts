import { User } from 'src/auth/user.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
  
@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @ManyToOne(() => User, (user) => user.feedback, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'userId' })
  user: User;
  @ManyToOne(() => DriverProfile, (driver) => driver.feedback, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'driverId' })
  driver: DriverProfile;

  @Column()
  rating: number;

  @Column({ type: 'text' })
  message: string;  
}