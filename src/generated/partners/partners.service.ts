import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerEntity, PartnerTransactionEntity } from './entities';
import { Partner, PartnerInput, PartnerTransaction, PartnerTransactionInput } from './dto';

/**
 * Service for partners business logic
 */
@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly repository: Repository<PartnerEntity>,
  ) {}

  /**
   * List partners
   */
  async getPartners(): Promise<Partner[]> {
    // TODO: Implement getPartners
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getPartners not implemented');
  }

  /**
   * Register new partner
   */
  async postPartners(partnerInput: PartnerInput): Promise<any> {
    // TODO: Implement postPartners
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postPartners not implemented');
  }

  /**
   * Get partner capital history
   */
  async getPartnersIdTransactions(id: string): Promise<PartnerTransaction[]> {
    // TODO: Implement getPartnersIdTransactions
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getPartnersIdTransactions not implemented');
  }

  /**
   * Add capital transaction (Increase/Decrease)
   */
  async postPartnersIdTransactions(id: string, partnerTransactionInput: PartnerTransactionInput): Promise<any> {
    // TODO: Implement postPartnersIdTransactions
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postPartnersIdTransactions not implemented');
  }

}
