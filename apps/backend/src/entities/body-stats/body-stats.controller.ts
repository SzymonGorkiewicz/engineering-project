import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request
} from '@nestjs/common';
import { BodyStatsService } from './body-stats.service';
import { CreateBodyStatDto } from './dto/create-body-stat.dto';
import { UpdateBodyStatDto } from './dto/update-body-stat.dto';

@Controller('body-stats')
export class BodyStatsController {
  constructor(private readonly bodyStatsService: BodyStatsService) {}

  @Post()
  create(@Body() createBodyStatDto: CreateBodyStatDto, @Request() request) {
    return this.bodyStatsService.create(createBodyStatDto, request.user.sub);
  }


  @Get()
  findAll(@Request() request) {
    return this.bodyStatsService.findAll(request.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBodyStatDto: UpdateBodyStatDto,
  ) {
    return this.bodyStatsService.update(+id, updateBodyStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodyStatsService.remove(+id);
  }
}
