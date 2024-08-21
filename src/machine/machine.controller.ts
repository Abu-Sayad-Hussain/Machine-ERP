import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDataDto } from './dto/create-machine-data.dto';

import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('machine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Create a machine' })
  @ApiResponse({ status: 201, description: 'The machine has been successfully created.' })
  async create(@Body() createMachineDataDto: CreateMachineDataDto) {
    return this.machineService.createMachineData(createMachineDataDto);
  }

  @Get('production-details')
  @ApiOperation({ summary: 'Get all machines' })
  @ApiResponse({ status: 200, description: 'List of all machines.' })
  async findAll(
    @Query('machine_type') machine_type: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('user_id') user_id: number,
  ) {
    return this.machineService.findAll(machine_type, from, to, user_id);
  }
}