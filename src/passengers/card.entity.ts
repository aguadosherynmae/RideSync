import { Entity, PrimaryGeneratedColumn, Column, OneToOne} from 'typeorm';
import { CashlessPayment } from './cashless_payment.entity';

@Entity()
export class Card  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  card_number: string;

  @Column({ type: 'timestamp' })
  expire_date: Date;

  @Column()
  security_code: string;

  //Relationships
  @OneToOne(() => CashlessPayment, (cashless) => cashless.card,  { cascade: true})
  cashless: CashlessPayment;
}