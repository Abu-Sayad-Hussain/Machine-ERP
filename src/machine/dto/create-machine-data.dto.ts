import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateMachineDataDto {
  @ApiProperty({ example: 1, description: 'ID of the machine' })
  @IsNumber()
  machine_id: number;

  @ApiProperty({ example: 1, description: 'ID of the user' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: '2023-01-01', description: 'Date of the data submission' })
  @IsDate()
  date: Date;

  @ApiProperty({ example: 'yes', description: 'Answer for question 1' })
  @IsString()
  q1: string;

  @ApiProperty({ example: 'no', description: 'Answer for question 2' })
  @IsString()
  q2: string;

  @ApiProperty({ example: 'not mandatory', description: 'Answer for question 3' })
  @IsString()
  q3: string;

  @ApiProperty({ example: 'yes', description: 'Answer for question 4' })
  @IsString()
  q4: string;

  @ApiProperty({ example: 'no', description: 'Answer for question 5' })
  @IsString()
  q5: string;
}