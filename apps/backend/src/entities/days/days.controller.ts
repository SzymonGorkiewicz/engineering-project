import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Req,
} from '@nestjs/common';
import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';



@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Post()
  create(@Body() createDayDto: CreateDayDto, @Request() request) {
    return this.daysService.create(createDayDto, request.user.sub);
  }

  @Get()
  findAll(@Query('range') range:string, @Request() request) {
    const rangeInt = parseInt(range, 10) || 7;
    return this.daysService.findInRange(rangeInt, request.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.daysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    return this.daysService.update(+id, updateDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daysService.remove(+id);
  }
}
