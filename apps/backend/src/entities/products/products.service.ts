import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Meal } from '../meals/entities/meal.entity';
import { MealProduct } from '../meal-product/entities/meal-product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(MealProduct)
    private mealProductRepository: Repository<MealProduct>,
    private configService: ConfigService,
  ) {}

  async get_or_create_product(productName: string): Promise<Product> {
    try {
      const product = await this.findOne(productName);
      return product;
    } catch (error) {
      console.log(error);
      const apiUrl = `${this.configService.get<string>('FOOD_API_URL')}=${productName}`;
      const response = await axios.get(apiUrl, {
        headers: { 'X-Api-Key': this.configService.get<string>('API_KEY') },
      });
      if (response.data['items'][0]) {
        const api_product = response.data['items'][0];
        const typedProduct: CreateProductDto = {
          name: api_product.name,
          protein_per_100g: api_product.protein_g,
          fat_per_100g: api_product.fat_total_g,
          carbohydrates_per_100g: api_product.carbohydrates_total_g,
          calories_per_100g: api_product.calories,
        };
        return await this.productRepository.save(typedProduct);
      }
      throw new NotFoundException(
        `Product with name "${productName}" not found`,
      );
    }
  }

  async addProductToMeal(
    mealId: number,
    productName: string,
  ): Promise<MealProduct> {
    const product = await this.get_or_create_product(productName);
    const meal = await this.mealRepository.findOne({
      where: { id: mealId },
      relations: ['mealProducts', 'mealProducts.product'],
    });

    if (!meal) {
      throw new Error('Meal not found');
    }

    const existingMealProduct = meal.mealProducts.find(
      (mp) => mp.product.id === product.id,
    );

    if (existingMealProduct) {
      throw new BadRequestException('Product is already added to this meal');
    }

    const mealProduct = this.mealProductRepository.create({
      meal: meal,
      product: product,
    });

    meal.total_calories += product.calories_per_100g;
    meal.total_protein += product.protein_per_100g;
    meal.total_carbohydrates += product.carbohydrates_per_100g;
    meal.total_fat += product.fat_per_100g;

    await this.mealRepository.save(meal);

    await this.mealProductRepository.save(mealProduct);

    return mealProduct;
  }

  async findOne(productName: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { name: productName },
    });
    if (!product) {
      throw new Error('Produkt nie znaleziony w bazie danych');
    }

    return product;
  }
}
