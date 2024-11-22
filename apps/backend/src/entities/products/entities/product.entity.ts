import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MealProduct } from 'src/entities/meal-product/entities/meal-product.entity';

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

  @OneToMany(() => MealProduct, (mealProduct) => mealProduct.product)
  mealProducts: MealProduct[];
}
