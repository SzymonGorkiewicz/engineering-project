import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { User } from 'src/entities/users/entities/user.entity';
import { Meal } from 'src/entities/meals/entities/meal.entity';

@Entity()
@Unique(['user', 'date'])
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'float', default: 0 })
  total_protein: number;

  @Column({ type: 'float', default: 0 })
  total_carbohydrates: number;

  @Column({ type: 'float', default: 0 })
  total_fat: number;

  @OneToMany(() => Meal, (meal) => meal.day)
  meals: Meal[];

  async createDefaultMeals(mealRepository: any) {
    await mealRepository.save([
      { day: this, meal_type: 'breakfast' },
      { day: this, meal_type: 'second_breakfast' },
      { day: this, meal_type: 'lunch' },
      { day: this, meal_type: 'afternoon_snack' },
      { day: this, meal_type: 'dinner' },
    ]);
  }
}
