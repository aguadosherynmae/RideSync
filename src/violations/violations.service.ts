import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Violation } from './violation.entity';
import { Risk } from './risk.entity';
import { ViolationDto } from './dto/violation.dto';
import { RiskMap } from './risk_levels';
import { RiskDto } from './dto/risk.dto';
import { User } from 'src/auth/user.entity';
import { DriverProfile } from 'src/drivers/driver_profile.entity';
import { ReportDto } from './dto/report.dto';
import { Reports } from './reports.entity';
import { Record } from './driver_violation.entity';
import { RecordDto } from './dto/violation_record.dto';

@Injectable()
export class ViolationsService {
    constructor(
        @InjectRepository(Violation)
        private violationRepository: Repository<Violation>,

        @InjectRepository(Risk)
        private riskRepository: Repository<Risk>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(DriverProfile)
        private driverRepository: Repository<DriverProfile>,

        @InjectRepository(Reports)
        private reportRepository: Repository<Reports>,

        @InjectRepository(Record)
        private recordRepository: Repository<Record>,
    ) {}
    async createViolation(violationDto: ViolationDto) {
        const { name, severity } = violationDto;

        const violation = this.violationRepository.create({
            name,
            severity
        });

        return await this.violationRepository.save(violation);
    }
    async editViolation(id: number, updateViolation: Partial<Violation>) {
        const violation = await this.violationRepository.findOne({ where: { id } });
        if (!violation) {
            throw new NotFoundException('Violation not found');
        }
        
        Object.assign(violation, updateViolation);
        return await this.violationRepository.save(violation);
    }
    async createRisk(riskDto: RiskDto) {
        const { risk_level } = riskDto;
        const value = RiskMap[risk_level]; 
    
        const risk = this.riskRepository.create({
          risk_level,
          value, 
        });
    
        return await this.riskRepository.save(risk);
    }
    async editRisk(id: number, updateRisk: Partial<Risk>) {
        const risk = await this.riskRepository.findOne({ where: { id } });
        if (!risk) {
            throw new NotFoundException('Risk not found');
        }
        
        Object.assign(risk, updateRisk);
        return await this.riskRepository.save(risk);
    }
    async createReport(reportDto: ReportDto) {
        const { userId, driverId, violationId} = reportDto;
        
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }

        const driver = await this.driverRepository.findOne({ where: { id: driverId } });
        if (!driver) {
          throw new NotFoundException('Driver not found');
        }

        const violation = await this.violationRepository.findOne({ where: { id: violationId } });
        if (!violation) {
          throw new NotFoundException('Violation not found');
        }

        const report = this.reportRepository.create({
            user,
            driver,
            violation
        });

        return await this.reportRepository.save(report);
    }
    async createRecord(recordDto: RecordDto) {
        const {driverId, violationId, report_by} = recordDto;
        
        const driver = await this.driverRepository.findOne({ where: { id: driverId } });
        if (!driver) {
          throw new NotFoundException('Driver not found');
        }

        const violation = await this.violationRepository.findOne({ where: { id: violationId } });
        if (!violation) {
          throw new NotFoundException('Violation not found');
        }

        const record = this.recordRepository.create({
            driver,
            violation,
            report_by
        });

        return await this.recordRepository.save(record);
    }
}
