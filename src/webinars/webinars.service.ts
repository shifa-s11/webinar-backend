import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webinar } from './webinar.schema';
import { CreateWebinarDto } from './dto/create-webinar.dto';
import { Types } from 'mongoose';

@Injectable()
export class WebinarsService {
  constructor(
    @InjectModel(Webinar.name)
    private readonly webinarModel: Model<Webinar>,
  ) {}

  async create(createWebinarDto: CreateWebinarDto): Promise<Webinar> {
    const webinar = new this.webinarModel({
      ...createWebinarDto,
      scheduledAt: new Date(createWebinarDto.scheduledAt),
    });

    return webinar.save();
  }
  async findAll() {
    return this.webinarModel
      .find({}, { title: 1, scheduledAt: 1, attendeeCount: 1 })
      .sort({ scheduledAt: 1 })
      .lean();
  }
  async findByIdWithAttendees(webinarId: string) {
    if (!Types.ObjectId.isValid(webinarId)) {
      throw new Error('Invalid webinar ID');
    }

    const result = await this.webinarModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(webinarId) },
      },
      {
        $lookup: {
          from: 'attendees',
          localField: '_id',
          foreignField: 'webinarId',
          as: 'attendees',
        },
      },
      {
        $addFields: {
          totalAttendees: { $size: '$attendees' },
        },
      },
    ]);

    return result[0];
  }
}
