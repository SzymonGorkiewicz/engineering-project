import { forwardRef, Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { DaysModule } from '../days/days.module';
import { ProductsModule } from '../products/products.module';


@Module({
  imports:[forwardRef(()=>DaysModule), forwardRef(()=>ProductsModule)],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
