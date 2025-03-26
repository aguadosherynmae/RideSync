import { Controller, Post, Body, ParseIntPipe, Param, Put, Get } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { ViolationDto } from './dto/violation.dto';
import { RiskDto } from './dto/risk.dto';
import { ReportDto } from './dto/report.dto';
import { RecordDto } from './dto/violation_record.dto';
import { PassengerViolationDto } from './dto/passenger_violation.dto';

@Controller('violations')
export class ViolationsController {
    constructor(private readonly violationService: ViolationsService) {}

    @Post('createViolation')
    async createViolation(@Body() violationDto: ViolationDto) {
        return this.violationService.createViolation(violationDto);
    }
    @Put('editViolation/:id')
    async editViolation(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateViolation: ViolationDto
  ) {
      return this.violationService.editViolation(id, updateViolation);
  }
    @Post('createRisk')
    async createRisk(@Body() riskDto: RiskDto) {
        return this.violationService.createRisk(riskDto);
    }
    @Put('editRisk/:id')
    async editRisk(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateRisk: RiskDto
  ) {
      return this.violationService.editRisk(id, updateRisk);
  }
    @Post('createReport')
    async createReport(@Body() reportDto: ReportDto) {
        return this.violationService.createReport(reportDto);
    }
    @Post('createRecord')
    async createRecord(@Body() recordDto: RecordDto) {
        return this.violationService.createRecord(recordDto);
    }
    @Post('createPassengerViolation')
    async createPassengerViolation(@Body() passenger_violationDto: PassengerViolationDto) {
        return this.violationService.createPassengerViolation(passenger_violationDto);
    }
    @Get('passengerViolation/:id')
    async getPassengerViolations(@Param('id', ParseIntPipe) id: number) {
        return this.violationService.getPassengerViolations(id);
    }
}
