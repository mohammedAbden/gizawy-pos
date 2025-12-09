import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Sale Entity
 */
@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * items
   */
  @Column({ type: 'varchar', nullable: true })
  items?: any[];

  /**
   * total
   */
  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
  total?: number;

  /**
   * date
   */
  @Column({ type: 'timestamp', nullable: true })
  date?: string;

  /**
   * cashierId
   */
  @Column({ type: 'varchar', nullable: true })
  cashierId?: string;

  /**
   * paymentMethod
   */
  @Column({ type: 'varchar', nullable: true, enum: ['CASH', 'CARD'] })
  paymentMethod?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
