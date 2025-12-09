import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Product Entity
 */
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   */
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  /**
   * category
   */
  @Column({ type: 'varchar', nullable: true })
  category?: string;

  /**
   * price
   */
  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
  price?: number;

  /**
   * cost
   */
  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
  cost?: number;

  /**
   * stock
   */
  @Column({ type: 'int', nullable: true })
  stock?: number;

  /**
   * sku
   */
  @Column({ type: 'varchar', nullable: true })
  sku?: string;

  /**
   * supplierIds
   */
  @Column({ type: 'varchar', nullable: true })
  supplierIds?: string[];

  /**
   * lowStockThreshold
   */
  @Column({ type: 'int', nullable: true })
  lowStockThreshold?: number;

  /**
   * image
   */
  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
