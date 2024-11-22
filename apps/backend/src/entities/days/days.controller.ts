import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Post()
  create(@Body() createDayDto: CreateDayDto, @Request() request) {
    console.log('wchodzi');
    return this.daysService.create(createDayDto, request.user.sub);
  }

  @Get()
  findAll(@Query('range') range: string, @Request() request) {
    const rangeInt = parseInt(range, 10) || 7;
    return this.daysService.findInRange(rangeInt, request.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daysService.remove(+id);
  }
}
