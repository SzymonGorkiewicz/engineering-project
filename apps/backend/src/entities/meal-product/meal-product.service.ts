import { Injectable } from '@nestjs/common';
import { UpdateMealProductDto } from './dto/update-meal-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MealProduct } from './entities/meal-product.entity';
import { Repository } from 'typeorm';
import { Meal } from '../meals/entities/meal.entity';

@Injectable()
export class MealProductService {
  constructor(
    @InjectRepository(MealProduct)
    private mealProductRepository: Repository<MealProduct>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
  ) {}

  async findAll(mealID: number): Promise<MealProduct[]> {
    return await this.mealProductRepository.find({
      where: { meal: { id: mealID } },
      relations: ['product'],
    });
  }

  async update(
    id: number,
    updateMealProductDto: UpdateMealProductDto,
  ): Promise<MealProduct> {
    const mealProduct = await this.mealProductRepository.findOne({
      where: { id },
      relations: ['product', 'meal'],
    });

    if (!mealProduct) {
      throw new Error('MealProduct not found');
    }

    const meal = mealProduct.meal; // Posiłek powiązany z MealProduct
    const product = mealProduct.product; // Produkt powiązany z MealProduct

    // Obliczanie poprzednich wartości na podstawie poprzedniej gramatury
    const previousGramature = mealProduct.gramature || 0;
    const previousCalories =
      (product.calories_per_100g * previousGramature) / 100;
    const previousProtein =
      (product.protein_per_100g * previousGramature) / 100;
    const previousCarbohydrates =
      (product.carbohydrates_per_100g * previousGramature) / 100;
    const previousFat = (product.fat_per_100g * previousGramature) / 100;

    // Obliczanie nowych wartości na podstawie nowej gramatury
    const newGramature =
      updateMealProductDto.gramature || mealProduct.gramature;
    const newCalories = (product.calories_per_100g * newGramature) / 100;
    const newProtein = (product.protein_per_100g * newGramature) / 100;
    const newCarbohydrates =
      (product.carbohydrates_per_100g * newGramature) / 100;
    const newFat = (product.fat_per_100g * newGramature) / 100;

    // Aktualizacja wartości w Meal (odejmowanie poprzednich i dodawanie nowych)
    meal.total_calories -= previousCalories;
    meal.total_protein -= previousProtein;
    meal.total_carbohydrates -= previousCarbohydrates;
    meal.total_fat -= previousFat;

    meal.total_calories += newCalories;
    meal.total_protein += newProtein;
    meal.total_carbohydrates += newCarbohydrates;
    meal.total_fat += newFat;

    // Zapisz Meal z nowymi wartościami
    await this.mealRepository.save(meal);
    console.log('gramatura');

    // const updatedFields: Partial<MealProduct> = {};
    // if (updateMealProductDto.gramature){
    //   updatedFields.gramature = updateMealProductDto.gramature
    // }

    await this.mealProductRepository.update(id, { gramature: newGramature });
    return this.mealProductRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} mealProduct`;
  }
}
