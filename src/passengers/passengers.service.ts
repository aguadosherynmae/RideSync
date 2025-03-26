import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassengerProfile } from './passenger_profile.entity';
import { User } from 'src/auth/user.entity';
import { PassengerProfileDto } from './dto/passenger-profile.dto';
import { RequesDto } from './dto/request_ride.dto';
import { RequestRide } from './request_ride.entity';
import { BoardingDto } from './dto/boarding_details.dto';
import { BoardingDetails } from './boarding_details.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { PaymentDto } from './dto/payment.dto';
import { Fare } from 'src/coop/fare.entity';
import { Discount } from './discount.entity';
import { Card } from './card.entity';
import { CashlessPayment } from './cashless_payment.entity';
import { DiscountDto } from './dto/discount.dto';
import { Record } from 'src/violations/driver_violation.entity';
import { CardDto } from './dto/card.dto';

@Injectable()
export class PassengersService {
    constructor(
        @InjectRepository(PassengerProfile)
        private passengerRepository: Repository<PassengerProfile>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(RequestRide)
        private requestRepository: Repository<RequestRide>,

        @InjectRepository(BoardingDetails)
        private boardingRepository: Repository<BoardingDetails>,

        @InjectRepository(DriverProfile)
        private driverRepository: Repository<DriverProfile>,

        @InjectRepository(Fare)
        private fareRepository: Repository<Fare>,

        @InjectRepository(Discount)
        private discountRepository: Repository<Discount>,

        @InjectRepository(Card)
        private cardRepository: Repository<Card>,

        @InjectRepository(CashlessPayment)
        private paymentRepository: Repository<CashlessPayment>,

        @InjectRepository(Record)
        private recordRepository: Repository<Record>,
    ) {}

    async createPassengerProfile(passengerProfileDto: PassengerProfileDto) {
        const { userId, first_name, middle_name, last_name, age, birth_date, discount_type, proof_img, passenger_img, status } = passengerProfileDto;
        
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }

        const passengerProfile = this.passengerRepository.create({
            user,
            first_name,
            middle_name,
            last_name,
            age,
            birth_date,
            discount_type,
            proof_img,
            passenger_img,
            status
        });

        return await this.passengerRepository.save(passengerProfile);
    }
    async editPassengerProfile(id: number, updateData: Partial<PassengerProfile>) {
        const passengerProfile = await this.passengerRepository.findOne({ where: { id } });
        if (!passengerProfile) {
            throw new NotFoundException('Driver profile not found');
        }
        
        Object.assign(passengerProfile, updateData);
        return await this.passengerRepository.save(passengerProfile);
    }
    async createRequest(request: RequesDto) {
        const { userId, destination, state } = request;
        
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }

        const request_ride = this.requestRepository.create({
            user,
            destination,
            state
        });

        return await this.requestRepository.save(request_ride);
    }
    async editRequest(id: number, updateReq: Partial<RequestRide>) {
        const editReq = await this.requestRepository.findOne({ where: { id } });
        if (!editReq) {
            throw new NotFoundException('Request not found');
        }
        
        Object.assign(editReq, updateReq);
        return await this.requestRepository.save(editReq);
    }
    async createBoarding(boarding: BoardingDto) {
        const { request_rideId, driverId, board_stat } = boarding;
        
        const request = await this.requestRepository.findOne({ where: { id: request_rideId } });
        if (!request) {
          throw new NotFoundException('Request ride not found');
        }

        const driver = await this.driverRepository.findOne({ where: { id: driverId } });
        if (!driver) {
          throw new NotFoundException('Driver not found');
        }

        const board = this.boardingRepository.create({
            request,
            driver,
            board_stat
        });

        return await this.boardingRepository.save(board);
    }

    async createPayment(payment: PaymentDto) {
        const { boardingId, fareId, discountId, cardId, amount_paid, ref_num } = payment;
        
        const boarding = await this.boardingRepository.findOne({ where: { id: boardingId } });
        if (!boarding) {
          throw new NotFoundException('Boarding details not found');
        }

        const fare = await this.fareRepository.findOne({ where: { id: fareId } });
        if (!fare) {
          throw new NotFoundException('Fare not found');
        }

        const discount = await this.discountRepository.findOne({ where: { id: discountId } });
        if (!discount) {
          throw new NotFoundException('Discount not found');
        }

        const card = await this.cardRepository.findOne({ where: { id: cardId } });
        if (!card) {
          throw new NotFoundException('Card not found');
        }

        const cashless_payment = this.paymentRepository.create({
            boarding,
            fare,
            discount,
            card,
            amount_paid,
            ref_num
        });

        return await this.paymentRepository.save(cashless_payment);
    }

    async createDiscount(discountDto: DiscountDto) {
      const { expire_date, discount_amount, recordId} = discountDto;
      
      const record = await this.recordRepository.findOne({ where: { id: recordId } });
      if (!record) {
        throw new NotFoundException('Record not found');
      }

      const discount = this.discountRepository.create({
          expire_date,
          discount_amount,
          record
      });

      return await this.discountRepository.save(discount);
    }
    async createCard(cardDto: CardDto) {
      const { card_number, expire_date, security_code} = cardDto;

      const card = this.cardRepository.create({
          card_number,
          expire_date,
          security_code
      });

      return await this.cardRepository.save(card);
  }
  async editCard(id: number, updateCard: Partial<Card>) {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
        throw new NotFoundException('Card not found');
    }
    
    Object.assign(card, updateCard);
    return await this.cardRepository.save(card);
  }
}
