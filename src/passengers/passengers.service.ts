import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassengerProfile } from './passenger_profile.entity';
import { User } from 'src/auth/user.entity';
import { PassengerProfileDto } from './dto/passenger-profile.dto';

@Injectable()
export class PassengersService {
    constructor(
        @InjectRepository(PassengerProfile)
        private passengerRepository: Repository<PassengerProfile>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
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
}
