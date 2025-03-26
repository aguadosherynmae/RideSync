import { Controller, Post, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengerProfileDto } from './dto/passenger-profile.dto';
import { RequesDto } from './dto/request_ride.dto';
import { BoardingDto } from './dto/boarding_details.dto';
import { PaymentDto } from './dto/payment.dto';
import { DiscountDto } from './dto/discount.dto';
import { CardDto } from './dto/card.dto';

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

    @Post('createRequest')
    async createRequest(@Body() requestDto: RequesDto) {
        return this.passengersService.createRequest(requestDto);
    }

    @Put('editRequest/:id')
    async editRequest(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateReq: RequesDto
    ) {
      return this.passengersService.editRequest(id, updateReq);
    }

    @Post('createBoarding')
    async createBoarding(@Body() boardDto: BoardingDto) {
        return this.passengersService.createBoarding(boardDto);
    }

    @Post('createPayment')
    async createPayment(@Body() paymentDto: PaymentDto) {
        return this.passengersService.createPayment(paymentDto);
    }

    @Post('createDiscount')
    async createDiscount(@Body() discountDto: DiscountDto) {
        return this.passengersService.createDiscount(discountDto);
    }

    @Post('createCard')
    async createCard(@Body() cardDto: CardDto) {
        return this.passengersService.createCard(cardDto);
    }

    @Put('editCard/:id')
    async editCard(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCard: CardDto
    ) {
      return this.passengersService.editCard(id, updateCard);
    }
}
