import { Injectable } from '@nestjs/common';
import { CreateMealProductDto } from './dto/create-meal-product.dto';
import { UpdateMealProductDto } from './dto/update-meal-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MealProduct } from './entities/meal-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealProductService {
  constructor(@InjectRepository(MealProduct) private mealProductRepository: Repository<MealProduct>){}

  async findAll(mealID:number):Promise<MealProduct[]> {
    return await this.mealProductRepository.find({where: {meal: {id:mealID}}, relations: ['product']});
  }

  async update(id: number, updateMealProductDto: UpdateMealProductDto):Promise<MealProduct> {
    const mealProduct = this.mealProductRepository.findOne({where: {id}})
    
    if (!mealProduct) {
      throw new Error('MealProduct not found');
    }
    const updatedFields: Partial<MealProduct> = {};
    if (updateMealProductDto.gramature){
      updatedFields.gramature = updateMealProductDto.gramature
    }
    
    await this.mealProductRepository.update(id, updatedFields)
    return this.mealProductRepository.findOne({where: {id}})
  }

  remove(id: number) {
    return `This action removes a #${id} mealProduct`;
  }
}
