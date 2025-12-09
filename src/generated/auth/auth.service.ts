import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { User } from './dto';

/**
 * Service for auth business logic
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  /**
   * Login user
   */
  async postAuthLogin(): Promise<User> {
    // TODO: Implement postAuthLogin
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postAuthLogin not implemented');
  }

}
