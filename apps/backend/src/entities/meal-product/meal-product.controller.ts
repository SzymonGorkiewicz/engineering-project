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

  @Post()
  create(@Body() createMealProductDto: CreateMealProductDto) {
    return this.mealProductService.create(createMealProductDto);
  }

  @Get()
  findAll(@Body() body: {mealID:number}) {
    return this.mealProductService.findAll(body.mealID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealProductService.findOne(+id);
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
