import { Injectable } from '@nestjs/common';
import { CreateBodyStatDto } from './dto/create-body-stat.dto';
import { UpdateBodyStatDto } from './dto/update-body-stat.dto';

@Injectable()
export class BodyStatsService {
  create(createBodyStatDto: CreateBodyStatDto) {
    return 'This action adds a new bodyStat';
  }

  findAll() {
    return `This action returns all bodyStats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyStat`;
  }

  update(id: number, updateBodyStatDto: UpdateBodyStatDto) {
    return `This action updates a #${id} bodyStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} bodyStat`;
  }
}
