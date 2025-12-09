import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

/**
 * Service for users business logic
 */
@Injectable()
export class UsersService {
  /**
   * List users
   */
  async getUsers(): Promise<any> {
    // TODO: Implement getUsers
    throw new Error('Method getUsers not implemented');
  }

  /**
   * Create user
   */
  async postUsers(): Promise<any> {
    // TODO: Implement postUsers
    throw new Error('Method postUsers not implemented');
  }

  /**
   * Remove user
   */
  async deleteUsersId(id: string): Promise<any> {
    // TODO: Implement deleteUsersId
    throw new Error('Method deleteUsersId not implemented');
  }

}
