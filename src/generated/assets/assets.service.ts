import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity } from './entities';
import { Asset, AssetInput } from './dto';

/**
 * Service for assets business logic
 */
@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly repository: Repository<AssetEntity>,
  ) {}

  /**
   * List assets
   */
  async getAssets(): Promise<Asset[]> {
    // TODO: Implement getAssets
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method getAssets not implemented');
  }

  /**
   * Register asset
   */
  async postAssets(assetInput: AssetInput): Promise<any> {
    // TODO: Implement postAssets
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method postAssets not implemented');
  }

  /**
   * Update asset status
   */
  async putAssetsId(id: string): Promise<any> {
    // TODO: Implement putAssetsId
    // Example using repository:
    // return this.repository.find();
    // return this.repository.findOne({ where: { id } });
    // return this.repository.save(data);
    throw new Error('Method putAssetsId not implemented');
  }

}
