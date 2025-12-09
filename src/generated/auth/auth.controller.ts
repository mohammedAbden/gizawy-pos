import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from './dto';

/**
 * Controller for auth endpoints
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login user
   */
  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Successful login', type: User })
  async postAuthLogin(): Promise<User> {
    return this.authService.postAuthLogin();
  }

}
