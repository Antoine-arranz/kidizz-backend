import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../Users/user.entity';
import { Daycare } from '../DayCares/dayCare.entity';

@Entity()
export class Child {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => User, (user) => user.children)
  creator: User;

  @ManyToMany(() => Daycare)
  @JoinTable()
  daycares: Daycare[];
}
