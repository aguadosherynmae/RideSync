import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret', 
      signOptions: { expiresIn: '1h' },
    }),
    DriversModule,
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
