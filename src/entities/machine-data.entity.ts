import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Machine } from './machine.entity';
import { User } from './user.entity';


@Entity('machine-data')
export class MachineData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  date: Date;

  @Column()
  q1: string;

  @Column()
  q2: string;

  @Column()
  q3: string;

  @Column()
  q4: string;

  @Column()
  q5: string;

  @CreateDateColumn()
  created_at: Date;
}
