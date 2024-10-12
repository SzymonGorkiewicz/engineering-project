import { PartialType } from '@nestjs/mapped-types';
import { CreateMealProductDto } from './create-meal-product.dto';

export class UpdateMealProductDto extends PartialType(CreateMealProductDto) {}
