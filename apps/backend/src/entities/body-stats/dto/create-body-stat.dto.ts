import { IsNumber, IsPositive, Min, IsNotEmpty } from 'class-validator';

export class CreateBodyStatDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  weight: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  chest_circ: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  waist_circ: number;

  @IsNotEmpty()
  date: Date;

  @IsNumber()
  id: number;
}
