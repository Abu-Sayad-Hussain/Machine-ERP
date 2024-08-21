import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { MachineData } from '../entities/machine-data.entity';
import { CreateMachineDataDto } from './dto/create-machine-data.dto';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(MachineData)
    private machineDataRepository: Repository<MachineData>,
  ) {}

  async createMachineData(createMachineDataDto: CreateMachineDataDto): Promise<MachineData> {
    const machineData = this.machineDataRepository.create(createMachineDataDto);
    return this.machineDataRepository.save(machineData);
  }

  async findAll(machine_type: string, from: Date, to: Date, user_id: number) {
    return this.machineDataRepository.find({
      where: {
        machine: { machine_type },
        date: Between(from, to),
        user: { id: user_id },
      },
      relations: ['machine', 'user'],
    });
  }
}
