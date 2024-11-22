import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { User } from 'src/entities/users/entities/user.entity';

@Entity()
@Unique(['user', 'date'])
export class BodyStats {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'float', nullable: false })
  weight: number;

  @Column({ type: 'float', nullable: false })
  chest_circ: number;

  @Column({ type: 'float', nullable: false })
  waist_circ: number;

  @Column({ type: 'date', nullable: false })
  date: Date;
}
