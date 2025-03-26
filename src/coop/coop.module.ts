import { Module } from '@nestjs/common';
import { CoopService } from './coop.service';
import { CoopController } from './coop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fare } from './fare.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fare])],
  providers: [CoopService],
  controllers: [CoopController]
})
export class CoopModule {}
