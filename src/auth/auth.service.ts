import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { DriversService } from 'src/drivers/drivers.service';
import { UpdateDto } from './dto/update.dto';
import * as nodemailer from 'nodemailer';


const resetCode = new Map<string, {code: string; expires: number}>();

@Injectable()
export class AuthService {
    private transporter;

    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private driversService: DriversService,
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ridesyncofficial@gmail.com',
                pass: 'ieavrokujrwwxjkw'
            },
        });
    }

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
                dto.address,
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

        const payload = { id: user.id, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload),
            id: user.id, 
            email: user.email, 
        };
    }

    async updateCredentials(id: number, updateDto: Partial<UpdateDto> & { currentPassword?: string }) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (updateDto.email) {
            console.log('Updating email to:', updateDto.email);
            user.email = updateDto.email;
        }

        if (updateDto.password) {
            if (!updateDto.currentPassword) {
                throw new BadRequestException('Current password is required to change password');
            }

            const isMatch = await bcrypt.compare(updateDto.currentPassword, user.password);
            if (!isMatch) {
                throw new BadRequestException('Current password is incorrect');
            }

            updateDto.password = await bcrypt.hash(updateDto.password, 10);
        }
        Object.assign(user, updateDto);
        return await this.userRepository.save(user);
    }

    async forgotPassword(email: string): Promise<{message: string}>{
        const user = await this.userRepository.findOne({where: {email}});
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = Date.now() + 1000 * 60 * 15; 
        resetCode.set(email, {code, expires});

        const mailOptions = {
            from: 'ridesyncofficial@gmail.com',
            to: email,
            subject: 'RideSync Password Reset',
            text: `Your 6-digit password reset code is: ${code}\nThis code will expire in 15 minutes.`,
    };
    await this.transporter.sendMail(mailOptions);
    return {message: 'Password reset code sent to email'};
    }

    async resetPassword(email: string, code: string, password: string): Promise<{message: string}>{
        const stored = resetCode.get(email);
        if (!stored) {
            throw new BadRequestException('No reset code requested for this email.');
        }
        if (stored.code !== code) {
            throw new BadRequestException('Invalid code');
        }
        if (Date.now() > stored.expires) {
            throw new BadRequestException('Code expired');
        }

        const user = await this.userRepository.findOne({where: {email}});
        if (!user) {
            throw new BadRequestException('User not found');
        }

        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.save(user);
        resetCode.delete(email);
        return {message: 'Password reset successful'};
    }

}
