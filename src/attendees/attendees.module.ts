import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from './attendees.schema';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { Webinar, WebinarSchema } from '../webinars/webinar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
      { name: Webinar.name, schema: WebinarSchema },
    ]),
  ],
  controllers: [AttendeesController],
  providers: [AttendeesService],
  exports: [MongooseModule],
})
export class AttendeesModule {}
