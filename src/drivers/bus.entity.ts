import { DriverProfile } from './driver_profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

export enum State {
    BLUE = 'blue',
    RED = 'red',
    ORANGE = 'orange',
    OFF = 'off'
  }

@Entity()
export class Bus  {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @OneToOne(() => DriverProfile, (driver) => driver.bus , { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'driver_Id' })
  driver: DriverProfile;

  @Column({ type: 'enum', enum:  State, default: State.OFF})
  state: State;

  @Column()
  issue_desc?: string;
}