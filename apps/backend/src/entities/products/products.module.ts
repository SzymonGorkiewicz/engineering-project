import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MealsModule } from '../meals/meals.module';

@Module({
  imports: [forwardRef(() => MealsModule)],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
