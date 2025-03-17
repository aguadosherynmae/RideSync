import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { User } from 'src/auth/user.entity';
import { Feedback } from './feedback.entity';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class FeedbacksService {
    constructor(
        @InjectRepository(DriverProfile)
        private driverRepository: Repository<DriverProfile>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Feedback)
        private feedbackRepository: Repository<Feedback>,
    ) {}

    async createFeedback(feedbackDto: FeedbackDto) {
        const { userId, driverId, rating, message } = feedbackDto;
        
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }

        const driver = await this.driverRepository.findOne({ where: { id: driverId } });
        if (!driver) {
          throw new NotFoundException('Driver not found');
        }
        const feedback = this.feedbackRepository.create({
            user,
            driver,
            rating,
            message
        });
        return await this.feedbackRepository.save(feedback);
    }
    async editFeedback(id: number, updateData: Partial<Feedback>) {
        const feedback = await this.feedbackRepository.findOne({ where: { id } });
        if (!feedback) {
            throw new NotFoundException('Feedback not found');
        }
        
        Object.assign(feedback, updateData);
        return await this.feedbackRepository.save(feedback);
      }
}
