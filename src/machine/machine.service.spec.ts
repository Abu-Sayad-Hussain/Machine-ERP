import { Test, TestingModule } from '@nestjs/testing';
import { MachineService } from './machine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MachineData } from '../entities/machine-data.entity';
import { Repository } from 'typeorm';

describe('MachineService', () => {
  let service: MachineService;
  let repository: Repository<MachineData>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MachineService,
        {
          provide: getRepositoryToken(MachineData),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MachineService>(MachineService);
    repository = module.get<Repository<MachineData>>(getRepositoryToken(MachineData));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create machine data', async () => {
    const createMachineDataDto = {
      machine_id: 1,
      user_id: 1,
      date: new Date(),
      q1: 'yes',
      q2: 'no',
      q3: 'yes',
      q4: 'no',
      q5: 'yes',
    };
    jest.spyOn(repository, 'save').mockResolvedValue(createMachineDataDto as any);

    const result = await service.createMachineData(createMachineDataDto as any);
    expect(result).toEqual(createMachineDataDto);
  });
});
