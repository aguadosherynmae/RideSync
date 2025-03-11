import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';
import { PassengersService } from './passengers.service';
import { User } from 'src/auth/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerProfile } from './passenger_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PassengerProfile])],
  controllers: [PassengersController],
  providers: [PassengersService]
})
export class PassengersModule {}
