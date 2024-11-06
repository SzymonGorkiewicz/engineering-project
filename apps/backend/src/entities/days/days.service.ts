import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { Between, Repository } from 'typeorm';
import { Meal } from '../meals/entities/meal.entity';



@Injectable()
export class DaysService {
  constructor(@InjectRepository(Day) private dayRepository: Repository<Day>,
  @InjectRepository(Meal) private mealRepository: Repository<Meal> ){}

  async create(createDayDto: CreateDayDto, userID: number):Promise<Day> {
    console.log(userID)
    if (userID){
      const day = this.dayRepository.create({user: {id:userID}, date: createDayDto.date});
      await this.dayRepository.save(day);
      await day.createDefaultMeals(this.mealRepository)

      return this.dayRepository.findOne({where: {id: day.id}, relations: ['meals']})
    }
    throw new UnauthorizedException('User not found or not authenticated.');
  }

  async findInRange(range: number, userID:number):Promise<Day[]> {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - range);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + range);
    

    return this.dayRepository.find({
      where: {
        user: {id:userID},
        date: Between(startDate,endDate)
          
      },
      order: { date: 'ASC' },
    });

  }

  findOne(id: number) {
    return `This action returns a #${id} day`;
  }

  update(id: number, updateDayDto: UpdateDayDto) {
    return `This action updates a #${id} day`;
  }

  remove(id: number) {
    return `This action removes a #${id} day`;
  }
}
