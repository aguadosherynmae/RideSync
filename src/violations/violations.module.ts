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

@Module({
  imports: [TypeOrmModule.forFeature([User, DriverProfile, Record, Reports, Violation, Risk])],
  providers: [ViolationsService],
  controllers: [ViolationsController]
})
export class ViolationsModule {}
