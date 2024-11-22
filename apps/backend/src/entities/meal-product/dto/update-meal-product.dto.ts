import { PartialType } from '@nestjs/mapped-types';
import { CreateMealProductDto } from './create-meal-product.dto';
import { IsNumber, Min } from 'class-validator';

export class UpdateMealProductDto extends PartialType(CreateMealProductDto) {
  @IsNumber()
  @Min(0)
  gramature: number;
}
