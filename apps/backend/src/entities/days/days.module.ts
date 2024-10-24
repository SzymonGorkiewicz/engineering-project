import { forwardRef, Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { UsersModule } from '../users/users.module';
import { MealsModule } from '../meals/meals.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => MealsModule)],
  controllers: [DaysController],
  providers: [DaysService],
})
export class DaysModule {}
