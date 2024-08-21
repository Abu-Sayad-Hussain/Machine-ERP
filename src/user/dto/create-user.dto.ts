import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'The employee ID of the user',
        example: 'EMP1234',
    })
    emp_id: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'password123',
    })
    password: string;
    lastLogin?: Date;
    last_pass_update?: Date;
  }
  