import { Controller, Post, Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly feedbacksService: FeedbacksService) {}

    @Post('createFeedback')
    async createFeedback(@Body() feedbackDto: FeedbackDto) {
        return this.feedbacksService.createFeedback(feedbackDto);
    }

    @Put('editFeedback/:id')
    async editFeedback(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateData: FeedbackDto
  ) {
      return this.feedbacksService.editFeedback(id, updateData);
  }
}
