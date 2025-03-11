import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverProfile } from './driver_profile.entity';
import { User } from 'src/auth/user.entity';
import { DriverStatus, Status } from './driver_status.entity';

@Injectable()
export class DriversService {
    constructor(
        @InjectRepository(DriverProfile)
        private driverRepository: Repository<DriverProfile>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(DriverStatus)
        private driverStatusRepository: Repository<DriverStatus>,
    ) {}

    async createDriverProfile(userId: number, first_name: string, middle_name: string, last_name: string, route: string, age: number, plate_number: string, license_no: string, cell_num: string, driver_img?: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        const driverProfile = this.driverRepository.create({
            user,
            first_name,
            middle_name,
            last_name,
            route,
            age,
            plate_number,
            license_no,
            cell_num,
            driver_img,
          });
      
          const savedDriverProfile = await this.driverRepository.save(driverProfile);

          const driverStatus = this.driverStatusRepository.create({
              driver_profile: savedDriverProfile, 
              status: Status.OFF_DUTY, // Default status
          });
          await this.driverStatusRepository.save(driverStatus);

          return savedDriverProfile;
    }

    async editDriverProfile(id: number, updateData: Partial<DriverProfile>) {
      const driverProfile = await this.driverRepository.findOne({ where: { id } });
      if (!driverProfile) {
          throw new NotFoundException('Driver profile not found');
      }
      
      Object.assign(driverProfile, updateData);
      return await this.driverRepository.save(driverProfile);
    }

    async editDriverStatus(id: number, updateStatus: Partial<DriverStatus>) {
      const driverStatus = await this.driverStatusRepository.findOne({ where: { id } });
      if (!driverStatus) {
          throw new NotFoundException('Driver profile not found');
      }
      
      Object.assign(driverStatus, updateStatus);
      return await this.driverStatusRepository.save(driverStatus);
    }
}
