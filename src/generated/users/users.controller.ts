import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';

/**
 * Controller for users endpoints
 */
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * List users
   */
  @Get('/')
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: 200, description: 'Successful' })
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }

  /**
   * Create user
   */
  @Post('/')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created' })
  async postUsers(): Promise<any> {
    return this.usersService.postUsers();
  }

  /**
   * Remove user
   */
  @Delete('/{id}')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiParam({ name: 'id', description: '' })
  async deleteUsersId(@Param('id') id: string): Promise<any> {
    return this.usersService.deleteUsersId(id);
  }

}
