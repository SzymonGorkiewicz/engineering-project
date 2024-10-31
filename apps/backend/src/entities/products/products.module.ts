import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MealsModule } from '../meals/meals.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => MealsModule), ConfigModule.forRoot(),],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
