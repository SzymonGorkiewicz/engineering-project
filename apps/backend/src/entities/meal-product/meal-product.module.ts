import { Module } from '@nestjs/common';
import { MealProductService } from './meal-product.service';
import { MealProductController } from './meal-product.controller';
import { MealsModule } from '../meals/meals.module';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealProduct } from './entities/meal-product.entity';
import { Meal } from '../meals/entities/meal.entity';

@Module({
  imports: [
    MealsModule,
    ProductsModule,
    TypeOrmModule.forFeature([MealProduct, Meal]),
  ],
  controllers: [MealProductController],
  providers: [MealProductService],
})
export class MealProductModule {}
