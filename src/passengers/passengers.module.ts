import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';
import { PassengersService } from './passengers.service';
import { User } from 'src/auth/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerProfile } from './passenger_profile.entity';
import { RequestRide } from './request_ride.entity';
import { BoardingDetails } from './boarding_details.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { CashlessPayment } from './cashless_payment.entity';
import { Card } from './card.entity';
import { Record } from 'src/violations/driver_violation.entity';
import { Fare } from 'src/coop/fare.entity';
import { Discount } from './discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PassengerProfile, RequestRide, BoardingDetails, DriverProfile, CashlessPayment, Card, Record, Fare, Discount])],
  controllers: [PassengersController],
  providers: [PassengersService]
})
export class PassengersModule {}
