import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { WebinarsService } from './webinars.service';
import { CreateWebinarDto } from './dto/create-webinar.dto';

@Controller('webinars')
export class WebinarsController {
  constructor(private readonly webinarsService: WebinarsService) {}

  @Post()
  async create(@Body() createWebinarDto: CreateWebinarDto) {
    const webinar = await this.webinarsService.create(createWebinarDto);

    return {
      success: true,
      data: webinar,
    };
  }
  @Get()
  async findAll() {
    const webinars = await this.webinarsService.findAll();

    return {
      success: true,
      data: webinars,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const webinar = await this.webinarsService.findByIdWithAttendees(id);

    if (!webinar) {
      throw new NotFoundException('Webinar not found');
    }

    return {
      success: true,
      data: webinar,
    };
  }
}
