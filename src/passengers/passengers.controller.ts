import { Controller, Post, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengerProfileDto } from './dto/passenger-profile.dto';

@Controller('passengers')
export class PassengersController {
    constructor(private readonly passengersService: PassengersService) {}

    @Post('createProfile')
    async createPassengerProfile(@Body() passengerProfileDto: PassengerProfileDto) {
        return this.passengersService.createPassengerProfile(passengerProfileDto);
    }

    @Put('editProfile/:id')
    async editPassengerProfile(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateData: PassengerProfileDto
  ) {
      return this.passengersService.editPassengerProfile(id, updateData);
  }
}
