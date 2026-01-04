import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { RegisterAttendeeDto } from './dto/register-attendee.dto';

@Controller('webinars/:id')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Post('register')
  async register(@Param('id') id: string, @Body() dto: RegisterAttendeeDto) {
    const result = await this.attendeesService.register(id, dto);

    return {
      success: true,
      data: result,
    };
  }
  @Get('attendees')
  async listAttendees(@Param('id') id: string) {
    const attendees = await this.attendeesService.findByWebinar(id);

    return {
      success: true,
      data: attendees,
    };
  }
}
