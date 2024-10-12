import { Module } from '@nestjs/common';
import { MealProductService } from './meal-product.service';
import { MealProductController } from './meal-product.controller';
import { MealsModule } from '../meals/meals.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [MealsModule, ProductsModule],
  controllers: [MealProductController],
  providers: [MealProductService],
})
export class MealProductModule {}
