import { IsString, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsString()
  @Length(7, 50, { message: 'Username must be at least 7 characters long.' })
  username: string;

  @IsString()
  @Matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{10,}$/,
    { message: 'Password must be at least 10 characters long, include one uppercase letter, and one special character.' },
  )
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;
}
