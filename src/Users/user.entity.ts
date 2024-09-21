import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Daycare } from '../DayCares/dayCare.entity';
import { Child } from '../Childs/child.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @OneToMany(() => Daycare, (daycare) => daycare.creator)
  daycares: Daycare[];

  @OneToMany(() => Child, (child) => child.creator)
  children: Child[];
}
