import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmpId(emp_id: string): Promise<User> {
    return this.userRepository.findOneBy({ emp_id });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }
}