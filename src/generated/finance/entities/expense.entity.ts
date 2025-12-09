import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Expense Entity
 */
@Entity('expenses')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * description
   */
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  /**
   * amount
   */
  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
  amount?: number;

  /**
   * category
   */
  @Column({ type: 'varchar', nullable: true })
  category?: string;

  /**
   * date
   */
  @Column({ type: 'timestamp', nullable: true })
  date?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
