import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('machine')
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  machine_name: string;

  @Column()
  machine_type: string;

  @CreateDateColumn()
  created_at: Date;
}
