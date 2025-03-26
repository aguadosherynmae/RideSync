import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fare } from './fare.entity';
import { FareDto } from './dto/fare.dto';

@Injectable()
export class CoopService {
    constructor(
        @InjectRepository(Fare)
        private fareRepository: Repository<Fare>,
    ){}
    async createFare(fareDto: FareDto) {
        const { route, amount } = fareDto;

        const fare = this.fareRepository.create({
            route,
            amount
        });

        return await this.fareRepository.save(fare);
    }
    async editFare(id: number, update: Partial<FareDto>) {
        const fare = await this.fareRepository.findOne({ where: { id } });
        if (!fare) {
            throw new NotFoundException('Id not found');
        }
        
        Object.assign(fare, update);
        return await this.fareRepository.save(fare);
      }
}
