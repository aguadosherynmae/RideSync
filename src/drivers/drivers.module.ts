import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriverProfile } from './driver_profile.entity'; 
import { DriverStatus } from './driver_status.entity';
import { User } from 'src/auth/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, DriverProfile, DriverStatus, Bus])],
  providers: [DriversService],
  controllers: [DriversController],
  exports: [DriversService]
})
export class DriversModule {}
