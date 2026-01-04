import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAttendeeDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;
}
