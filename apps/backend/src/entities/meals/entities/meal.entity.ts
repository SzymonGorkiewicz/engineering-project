import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Day } from 'src/entities/days/entities/day.entity';
import { Product } from 'src/entities/products/entities/product.entity';

export enum MealType {
  BREAKFAST = 'breakfast',
  SECOND_BREAKFAST = 'second_breakfast',
  LUNCH = 'lunch',
  AFTERNOON_SNACK = 'afternoon_snack',
  DINNER = 'dinner',
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

  @ManyToMany(() => Product, (product) => product.meals, { cascade: true })
  products: Product[];
}
