import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  emp_id: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ nullable: true })
  last_login: Date;

  @Column({ nullable: true })
  last_pass_update: Date;
}