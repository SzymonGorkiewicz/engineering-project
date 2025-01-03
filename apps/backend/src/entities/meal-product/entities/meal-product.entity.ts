import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { Meal } from 'src/entities/meals/entities/meal.entity';
import { Product } from 'src/entities/products/entities/product.entity';

@Entity()
@Unique(['meal', 'product'])
export class MealProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meal, (meal) => meal.mealProducts, { onDelete: 'CASCADE' })
  meal: Meal;

  @ManyToOne(() => Product, (product) => product.mealProducts, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'float', default: 100 })
  gramature: number;
}
