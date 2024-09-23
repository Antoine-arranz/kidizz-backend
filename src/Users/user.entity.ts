import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ChildCare } from '../ChildCares/childCare.entity';
import { Child } from '../Childs/child.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @OneToMany(() => ChildCare, (childCare) => childCare.creator)
  childCares: ChildCare[];

  @OneToMany(() => Child, (child) => child.creator)
  children: Child[];
}
