import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { MachineData } from '../entities/machine-data.entity'; // Adjust the path as necessary
import { Machine } from '../entities/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine, MachineData])],
  providers: [MachineService],
  controllers: [MachineController],
})
export class MachineModule {}
