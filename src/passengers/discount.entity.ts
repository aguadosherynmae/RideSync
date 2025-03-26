import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { Record } from 'src/violations/driver_violation.entity';
import { CashlessPayment } from './cashless_payment.entity';

@Entity()
export class Discount  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  expire_date: Date;

  @Column()
  discount_amount: number;

  //Relationship
  @OneToOne(() => Record, (record) => record.discount, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'recordId' })
  record?: Record;
  @OneToOne(() => CashlessPayment, (cashless) => cashless.discount,  { cascade: true})
  cashless: CashlessPayment;
}