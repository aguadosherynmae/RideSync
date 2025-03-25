import { Module } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { ViolationsController } from './violations.controller';
import { User } from 'src/auth/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { Record } from './driver_violation.entity';
import { Reports } from './reports.entity';
import { Violation } from './violation.entity';
import { Risk } from './risk.entity';
import { PassengerViolation } from './passenger_violation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, DriverProfile, Record, Reports, Violation, Risk, PassengerViolation])],
  providers: [ViolationsService],
  controllers: [ViolationsController]
})
export class ViolationsModule {}
