import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBodyStatDto } from './dto/create-body-stat.dto';
import { UpdateBodyStatDto } from './dto/update-body-stat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyStats } from './entities/body-stat.entity';

@Injectable()
export class BodyStatsService {
  constructor(@InjectRepository(BodyStats) private bodyStatsRepository: Repository<BodyStats>){}

  async create(createBodyStatDto: CreateBodyStatDto, userID: number) {
    const bodyStats = this.bodyStatsRepository.create({
      ...createBodyStatDto,
      user: {id:userID}
    })

    await this.bodyStatsRepository.save(bodyStats)
    
    return 'This action adds a new bodyStat';
  }

  async findAll(id: number):Promise<BodyStats[]> {
    const bodyStatsForUser = await this.bodyStatsRepository.find({where: {user:{id:id}}})
    return bodyStatsForUser;
  }

  async findOne(userID:number, id: number):Promise<BodyStats> {
    const oneBodyStat = await this.bodyStatsRepository.findOne({where:{ id:id, user:{id:userID}}})
    return oneBodyStat;
  }

  async update(id: number, updateBodyStatDto: UpdateBodyStatDto):Promise<BodyStats> {
    const bodyStat = await this.bodyStatsRepository.findOne({ where: { id } });

    if (!bodyStat) {
      throw new NotFoundException(`BodyStat with id ${id} not found`);
    }

    const updatedBodyStat = Object.assign(bodyStat, updateBodyStatDto);

    return await this.bodyStatsRepository.save(updatedBodyStat);;
  }

  async remove(id: number) {
    console.log('wchodzi')
    const deleteResult = await this.bodyStatsRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new Error(`BodyStat with ID ${id} not found`);
    }

    return `BodyStat with ID ${id} has been removed successfully.`;
    }
}
