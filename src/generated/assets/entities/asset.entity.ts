import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Asset Entity
 */
@Entity('assets')
export class AssetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   */
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  /**
   * type
   */
  @Column({ type: 'varchar', nullable: true })
  type?: string;

  /**
   * value
   */
  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
  value?: number;

  /**
   * status
   */
  @Column({ type: 'varchar', nullable: true, enum: ['Active', 'Maintenance', 'Broken'] })
  status?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
