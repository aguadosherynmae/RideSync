import { Controller, Body, Put, Param, ParseIntPipe, Get  } from '@nestjs/common';
import { DriversService  } from './drivers.service';
import { UpdateDriverProfileDto } from './dto/update-driver-profile.dto';
import { DriverStatusDto } from './dto/update-driver-status.dto';

@Controller('drivers')
export class DriversController {
    constructor(private readonly driversService: DriversService) {}

  @Put('editProfile/:id')
  async editDriverProfile(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateData: UpdateDriverProfileDto
  ) {
      return this.driversService.editDriverProfile(id, updateData);
  }

  @Put('editStatus/:id')
  async editDriverStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateStatus: DriverStatusDto
  ) {
      return this.driversService.editDriverStatus(id, updateStatus);
  }

  @Get('profile/:id')
    async getDriverProfile(@Param('id', ParseIntPipe) id: number) {
        return this.driversService.getDriverProfile(id);
    }
}
