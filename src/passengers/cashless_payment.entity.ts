import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BoardingDetails } from './boarding_details.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { Fare } from 'src/coop/fare.entity';
import { Discount } from './discount.entity';
import { Card } from './card.entity';

@Entity()
export class CashlessPayment  {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @OneToOne(() => BoardingDetails, (boarding) => boarding.cashless, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'boardingId' })
  boarding:BoardingDetails;
  @ManyToOne(() => Fare, (fare) => fare.cashless, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'fareId' })
  fare: Fare;
  @ManyToOne(() => Discount, (discount) => discount.cashless, { onDelete: 'CASCADE', nullable: true }) 
  @JoinColumn({ name: 'discountId' })
  discount: Discount;
  @OneToOne(() => Card, (card) => card.cashless, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'cardid' })
  card:Card;

  @Column()
  amount_paid: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_paid: Date;

  @Column()
  ref_num: string;
}