import { User } from 'src/auth/user.entity';
import { DriverStatus } from './driver_status.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
  
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

  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;

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