import { forwardRef, Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { DaysModule } from '../days/days.module';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';

@Module({
  imports: [forwardRef(() => DaysModule), forwardRef(() => ProductsModule), TypeOrmModule.forFeature([Meal])],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
