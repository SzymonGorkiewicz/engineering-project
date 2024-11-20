import { forwardRef, Module } from '@nestjs/common';
import { BodyStatsService } from './body-stats.service';
import { BodyStatsController } from './body-stats.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyStats } from './entities/body-stat.entity';

@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([BodyStats])],
  controllers: [BodyStatsController],
  providers: [BodyStatsService],
})
export class BodyStatsModule {}
