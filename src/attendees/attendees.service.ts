import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Attendee } from './attendees.schema';
import { RegisterAttendeeDto } from './dto/register-attendee.dto';
import { Webinar } from '../webinars/webinar.schema';

@Injectable()
export class AttendeesService {
  constructor(
    @InjectModel(Attendee.name)
    private readonly attendeeModel: Model<Attendee>,

    @InjectModel(Webinar.name)
    private readonly webinarModel: Model<Webinar>,
  ) {}

  async register(webinarId: string, dto: RegisterAttendeeDto) {
    if (!Types.ObjectId.isValid(webinarId)) {
      throw new NotFoundException('Invalid webinar ID');
    }

    const webinar = await this.webinarModel.findById(webinarId);
    if (!webinar) {
      throw new NotFoundException('Webinar not found');
    }

    try {
      await this.attendeeModel.create({
        webinarId: webinar._id,
        fullName: dto.fullName.trim(),
        email: dto.email.toLowerCase().trim(),
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Email already registered for this webinar',
        );
      }
      throw error;
    }

    await this.webinarModel.updateOne(
      { _id: webinar._id },
      { $inc: { attendeeCount: 1 } },
    );
    const updatedWebinar = await this.webinarModel.findByIdAndUpdate(
      webinar._id,
      { $inc: { attendeeCount: 1 } },
      { new: true },
    );
    return {
      message: 'Registration successful',
      attendeeCount: updatedWebinar.attendeeCount,
    };
  }
  async findByWebinar(webinarId: string) {
    if (!Types.ObjectId.isValid(webinarId)) {
      throw new NotFoundException('Invalid webinar ID');
    }
    const webinarObjectId = new Types.ObjectId(webinarId);
    const webinarExists = await this.webinarModel.exists({ _id: webinarId });
    if (!webinarExists) {
      throw new NotFoundException('Webinar not found');
    }
    return this.attendeeModel
      .find(
        { webinarId: webinarObjectId },
        { fullName: 1, email: 1, createdAt: 1 },
      )

      .sort({ createdAt: 1 })
      .lean();
  }
}
