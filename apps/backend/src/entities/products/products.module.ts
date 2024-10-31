import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MealsModule } from '../meals/meals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Meal } from '../meals/entities/meal.entity';
import { MealProduct } from '../meal-product/entities/meal-product.entity';

@Module({
  imports: [forwardRef(() => MealsModule), TypeOrmModule.forFeature([Product,Meal,MealProduct])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
