import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { RequestRide } from './request_ride.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { CashlessPayment } from './cashless_payment.entity';

export enum BoardStat {
  ACTIVE = 'active',
  NOT = 'not'
}

@Entity()
export class BoardingDetails  {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @OneToOne(() => RequestRide, (request) => request.boarding, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'request_rideId' })
  request: RequestRide;
  @ManyToOne(() => DriverProfile, (driver) => driver.boarding, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'driverId' })
  driver: DriverProfile;
  @OneToOne(() => CashlessPayment, (cashless) => cashless.boarding,  { cascade: true})
  cashless: CashlessPayment;

  @Column({ type: 'enum', enum: BoardStat, default: BoardStat.ACTIVE })
  board_stat: BoardStat;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}