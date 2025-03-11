import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

export enum DiscountType {
  STUDENT = 'student',
  SENIOR = 'senior',
  PWD = 'pwd',
  NONE = 'none'
}

export enum Status {
  VERIFIED = 'verified',
  NOT_VERIFIED = 'notverified'
}

@Entity()
export class PassengerProfile  {
  @PrimaryGeneratedColumn()
  id: number;

  //Relationship
  @OneToOne(() => User, (user) => user.passengerProfile , { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column()
  birth_date: Date;

  @Column({ type: 'enum', enum:  DiscountType})
  discount_type: DiscountType;

  @Column({ nullable: true })
  proof_img?: string;

  @Column({ nullable: true })
  passenger_img?: string;

  @Column({ type: 'enum', enum:  Status, default: Status.NOT_VERIFIED})
  status: Status;
}