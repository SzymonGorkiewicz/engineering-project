import { forwardRef, Module } from '@nestjs/common';
import { BodyStatsService } from './body-stats.service';
import { BodyStatsController } from './body-stats.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [BodyStatsController],
  providers: [BodyStatsService],
})
export class BodyStatsModule {}
