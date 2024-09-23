import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../Users/user.entity';
import { ChildCare } from '../ChildCares/childCare.entity';

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

  @ManyToMany(() => ChildCare)
  @JoinTable()
  childCares: ChildCare[];
}
