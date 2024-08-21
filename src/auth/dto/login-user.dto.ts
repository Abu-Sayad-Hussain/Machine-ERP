import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  emp_id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}