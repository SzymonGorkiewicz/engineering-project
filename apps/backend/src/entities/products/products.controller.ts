import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  create(@Body() body: {mealID:number, productName:string}) {
    return this.productsService.addProductToMeal(body.mealID, body.productName);
  }

  @Get()
  findOne(@Body() body: {productName:string}) {
    
    return this.productsService.findOne(body.productName);
  }
}
