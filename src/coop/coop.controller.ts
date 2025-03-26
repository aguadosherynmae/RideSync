import { Controller, Post, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { CoopService } from './coop.service';
import { FareDto } from './dto/fare.dto';

@Controller('coop')
export class CoopController {
    constructor(private readonly coopService: CoopService) {}
    @Post('createFare')
    async createFare(@Body() fareDto: FareDto) {
        return this.coopService.createFare(fareDto);
    }
    @Put('editFare/:id')
    async editFare(
      @Param('id', ParseIntPipe) id: number,
      @Body() update: FareDto
    ) {
      return this.coopService.editFare(id, update);
    }
}
