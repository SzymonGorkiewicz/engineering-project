import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Meal } from 'src/entities/meals/entities/meal.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'float', nullable: false })
  protein_per_100g: number;

  @Column({ type: 'float', nullable: false })
  carbohydrates_per_100g: number;

  @Column({ type: 'float', nullable: false })
  fat_per_100g: number;

  @Column({ type: 'float', nullable: false })
  calories_per_100g: number;

  @ManyToMany(() => Meal, (meal) => meal.products)
  meals: Meal[];
}
