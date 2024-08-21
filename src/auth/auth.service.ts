import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(emp_id: string, password: string): Promise<User> {
    const user = await this.userService.findByEmpId(emp_id);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    // Update last login timestamp
    user.last_login = new Date();
    await this.userService.updateUser(user.id, { last_login: user.last_login });

    const payload = { emp_id: user.emp_id, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    // Check if user with the given emp_id already exists
    const existingUser = await this.userService.findByEmpId(createUserDto.emp_id);
    if (existingUser) {
      throw new ConflictException('User with this emp_id already exists');
    }

    // Create and save the new user
    const newUser = this.userService.create(createUserDto);
    return newUser;
  }

  async changePassword(userId: number, newPassword: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.last_pass_update = new Date();
    return this.userService.updateUser(user.id, {
      password: user.password,
      last_pass_update: user.last_pass_update,
    });
  }
}