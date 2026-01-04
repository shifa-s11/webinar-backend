import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Webinar extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true })
  scheduledAt: Date;

  @Prop({ default: 0 })
  attendeeCount: number;
}

export const WebinarSchema = SchemaFactory.createForClass(Webinar);
