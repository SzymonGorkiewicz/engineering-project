import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BodyStats } from 'src/entities/body-stats/entities/body-stat.entity';
import { Day } from 'src/entities/days/entities/day.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({unique: true})
  email: string;

  @OneToMany(() => BodyStats, (bodyStats) => bodyStats.user)
  bodyStats: BodyStats[];

  @OneToMany(() => Day, (day) => day.user)
  days: Day[];
  

}