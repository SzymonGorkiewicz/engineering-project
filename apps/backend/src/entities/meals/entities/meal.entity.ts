import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Day } from 'src/entities/days/entities/day.entity';
import { MealProduct } from 'src/entities/meal-product/entities/meal-product.entity';

export enum MealType {
  BREAKFAST = 'Breakfast',
  SECOND_BREAKFAST = 'Second Breakfast',
  LUNCH = 'Lunch',
  AFTERNOON_SNACK = 'Afternoon Snack',
  DINNER = 'Dinner',
}

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Day, (day) => day.meals, { onDelete: 'CASCADE' })
  day: Day;

  @Column({
    type: 'enum',
    enum: MealType,
    nullable: false,
  })
  meal_type: MealType;

  @Column({ type: 'float', default: 0 })
  total_protein: number;

  @Column({ type: 'float', default: 0 })
  total_carbohydrates: number;

  @Column({ type: 'float', default: 0 })
  total_fat: number;

  @Column({ type: 'float', default: 0 })
  total_calories: number;

  @OneToMany(() => MealProduct, (mealProduct) => mealProduct.meal)
  mealProducts: MealProduct[];
}
