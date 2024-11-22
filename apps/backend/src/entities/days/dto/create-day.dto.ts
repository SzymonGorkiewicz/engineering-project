import { IsNotEmpty } from 'class-validator';

export class CreateDayDto {
  @IsNotEmpty()
  date: Date;
}
