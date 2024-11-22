import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { Between, Repository } from 'typeorm';
import { Meal } from '../meals/entities/meal.entity';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day) private dayRepository: Repository<Day>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
  ) {}

  async create(createDayDto: CreateDayDto, userID: number): Promise<Day> {
    console.log(userID);
    if (userID) {
      const day = this.dayRepository.create({
        user: { id: userID },
        date: createDayDto.date,
      });
      await this.dayRepository.save(day);
      await day.createDefaultMeals(this.mealRepository);

      return this.dayRepository.findOne({
        where: { id: day.id },
        relations: ['meals'],
      });
    }
    throw new UnauthorizedException('User not found or not authenticated.');
  }

  async findInRange(range: number, userID: number): Promise<Day[]> {
    this.calculateTotalCalories(userID);
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - range);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + range);

    return this.dayRepository.find({
      where: {
        user: { id: userID },
        date: Between(startDate, endDate),
      },
      order: { date: 'ASC' },
    });
  }

  async calculateTotalCalories(UserID: number): Promise<void> {
    const days = await this.dayRepository.find({
      where: { user: { id: UserID } },
      relations: ['meals'],
    });

    for (const day of days) {
      let dayCalories = 0;
      let dayProtein = 0;
      let dayCarbohydrates = 0;
      let dayFat = 0;

      for (const meal of day.meals) {
        dayCalories += meal.total_calories;
        dayProtein += meal.total_protein;
        dayCarbohydrates += meal.total_carbohydrates;
        dayFat += meal.total_fat;
      }

      day.total_calories = parseFloat(dayCalories.toFixed(1));
      day.total_protein = parseFloat(dayProtein.toFixed(1));
      day.total_carbohydrates = parseFloat(dayCarbohydrates.toFixed(1));
      day.total_fat = parseFloat(dayFat.toFixed(1));

      await this.dayRepository.save(day);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} day`;
  }
}
