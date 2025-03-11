import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository  } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'; 
import { DriversService } from 'src/drivers/drivers.service'; 

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService, 
        private driversService: DriversService,
      ) {}
    
      async register(dto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
        if (existingUser) throw new BadRequestException('Email already registered');
    
        const hashedPassword = await bcrypt.hash(dto.password, 10);
    
        const user = this.userRepository.create({ ...dto, password: hashedPassword });
        const savedUser = await this.userRepository.save(user);
        
        if (savedUser.role === UserRole.DRIVER) {
          await this.driversService.createDriverProfile(
              savedUser.id,
              dto.first_name,
              dto.middle_name,
              dto.last_name,
              dto.route,
              dto.age,
              dto.plate_number,
              dto.license_no,
              dto.cell_num,
              dto.driver_img
          );
      }
        return savedUser;
      }
      async login(dto: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: dto.email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');
    
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    
        return { accessToken: this.jwtService.sign({ id: user.id, role: user.role }) };
      }
}
