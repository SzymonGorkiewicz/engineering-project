import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BodyStatsModule } from '../body-stats/body-stats.module';
import { DaysModule } from '../days/days.module';

@Module({
  imports: [BodyStatsModule, DaysModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
