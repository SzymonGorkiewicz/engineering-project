import { Controller, Get, Param, Delete } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.mealsService.findAll(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(+id);
  }
}
