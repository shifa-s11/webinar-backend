import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebinarsController } from './webinars.controller';
import { WebinarsService } from './webinars.service';
import { Webinar, WebinarSchema } from './webinar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Webinar.name, schema: WebinarSchema }]),
  ],
  controllers: [WebinarsController],
  providers: [WebinarsService],
})
export class WebinarsModule {}
