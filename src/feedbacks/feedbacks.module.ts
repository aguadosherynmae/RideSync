import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { User } from 'src/auth/user.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity'; 
import { Feedback } from './feedback.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, DriverProfile, Feedback])],
  providers: [FeedbacksService],
  controllers: [FeedbacksController]
})
export class FeedbacksModule {}
