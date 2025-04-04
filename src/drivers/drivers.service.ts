import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverProfile } from './driver_profile.entity';
import { User } from 'src/auth/user.entity';
import { DriverStatus, Status } from './driver_status.entity';
import { Bus, State } from './bus.entity';

@Injectable()
export class DriversService {
    constructor(
        @InjectRepository(DriverProfile)
        private driverRepository: Repository<DriverProfile>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(DriverStatus)
        private driverStatusRepository: Repository<DriverStatus>,

        @InjectRepository(Bus)
        private busRepository: Repository<Bus>,
    ) {}

    async createDriverProfile(userId: number, first_name: string, middle_name: string, last_name: string, address: string, route: string, age: number, plate_number: string, license_no: string, cell_num: string, driver_img?: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        const driverProfile = this.driverRepository.create({
            user,
            first_name,
            middle_name,
            last_name,
            address,
            route,
            age,
            plate_number,
            license_no,
            cell_num,
            driver_img,
          });
      
          const savedDriverProfile = await this.driverRepository.save(driverProfile);

          const driverStatus = this.driverStatusRepository.create({
              driver: savedDriverProfile, 
              status: Status.OFF_DUTY, 
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
      const updatedDriverStatus = await this.driverStatusRepository.save(driverStatus);

      if (updateStatus.status === 'in_transit') {
        let bus = await this.busRepository.findOne({ where: { driver: { id } }, relations: ['driver'] });
        if (!bus) {
          bus = this.busRepository.create({
              driver: driverStatus, 
              state: State.BLUE,
              issue_desc: '',
          });
      } else {
          bus.state = State.BLUE;
          bus.issue_desc = '';
      }
      await this.busRepository.save(bus); 
    }
    return updatedDriverStatus;
    }
    async getDriverProfile(userId: number) {
      const driver = await this.driverRepository.findOne({
          where: { user: { id: userId } }, 
          relations: ['user'], 
      });
      if (!driver) {
          throw new NotFoundException('Driver profile not found');
      }
      return driver;
    }
    async editBusStatus(id: number, updateBus: Partial<Bus>) {
      const bus_status = await this.busRepository.findOne({ where: { id } });
      if (!bus_status) {
          throw new NotFoundException('Bus not found');
      }
      
      Object.assign(bus_status, updateBus);
      return await this.busRepository.save(bus_status);
    }
}
