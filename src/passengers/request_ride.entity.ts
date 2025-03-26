import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BoardingDetails } from './boarding_details.entity';

export enum State {
  WAITING = 'waiting',
  NOT = 'not'
}

@Entity()
export class RequestRide  {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @ManyToOne(() => User, (user) => user.request, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'passengerId' })
  user: User;
  @OneToOne(() => BoardingDetails, (boarding) => boarding.request,  { cascade: true})
  boarding: BoardingDetails;

  @Column()
  destination: string;

  @Column({ type: 'enum', enum: State, default: State.WAITING})
  state: State;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}