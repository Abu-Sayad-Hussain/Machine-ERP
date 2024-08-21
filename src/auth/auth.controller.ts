import { Controller, Post, Body, UseGuards, Request, Patch, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './local.strategy';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'sign up a user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'LogIn a User' })
  @ApiResponse({ status: 201, description: 'Logged in successfully' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'returned user profile' })
  @ApiResponse({ status: 200, description: 'Profile returned successfully' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  @ApiOperation({ summary: 'Set a new Password' })
  @ApiResponse({ status: 201, description: 'password changed successfully' })
  async changePassword(
    @Request() req,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.changePassword(req.user.userId, newPassword);
  }
}