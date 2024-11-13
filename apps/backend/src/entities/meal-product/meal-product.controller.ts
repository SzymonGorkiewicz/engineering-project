import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MealProductService } from './meal-product.service';
import { CreateMealProductDto } from './dto/create-meal-product.dto';
import { UpdateMealProductDto } from './dto/update-meal-product.dto';

@Controller('meal-product')
export class MealProductController {
  constructor(private readonly mealProductService: MealProductService) {}

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.mealProductService.findAll(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMealProductDto: UpdateMealProductDto,
  ) {
    return this.mealProductService.update(+id, updateMealProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealProductService.remove(+id);
  }
}
