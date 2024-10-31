import { forwardRef, Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { UsersModule } from '../users/users.module';
import { MealsModule } from '../meals/meals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { Meal } from '../meals/entities/meal.entity';
import { AuthModule } from '../../auth/auth.module';


@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => AuthModule),forwardRef(() => MealsModule), TypeOrmModule.forFeature([Day, Meal])],
  controllers: [DaysController],
  providers: [DaysService],
})
export class DaysModule {}
