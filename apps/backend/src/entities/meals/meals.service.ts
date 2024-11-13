import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(@InjectRepository(Meal) private mealRepository: Repository<Meal>,){}


  create(createMealDto: CreateMealDto) {
    return 'This action adds a new meal';
  }

  async findAll(id: number): Promise<Meal[]> {
    console.log(await this.mealRepository.find({where: {day: {id:id}}}))
    return await this.mealRepository.find({where: {day: {id:id}}});
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
