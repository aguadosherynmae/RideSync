import { CashlessPayment } from 'src/passengers/cashless_payment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Fare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  route: String;  

  @Column()
  amount: number;
  
  //Relationships
  @OneToOne(() => CashlessPayment, (cashless) => cashless.fare,  { cascade: true})
  cashless: CashlessPayment;
}