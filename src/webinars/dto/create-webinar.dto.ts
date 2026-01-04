import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateWebinarDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsDateString()
  scheduledAt: string;
}
