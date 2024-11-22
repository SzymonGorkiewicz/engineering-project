import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
  ) {}

  async findAll(id: number): Promise<Meal[]> {
    return await this.mealRepository.find({
      where: { day: { id: id } },
      order: { id: 'ASC' },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
