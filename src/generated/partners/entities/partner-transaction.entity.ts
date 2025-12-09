import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * PartnerTransaction Entity
 */
@Entity('partner_transactions')
export class PartnerTransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * partnerId
   */
  @Column({ type: 'varchar', nullable: true })
  partnerId?: string;

  /**
   * amount
   */
  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
  amount?: number;

  /**
   * type
   */
  @Column({ type: 'varchar', nullable: true, enum: ['DEPOSIT', 'WITHDRAWAL'] })
  type?: string;

  /**
   * date
   */
  @Column({ type: 'varchar', nullable: true })
  date?: string;

  /**
   * proofImage
   */
  @Column({ type: 'varchar', nullable: true })
  proofImage?: string;

  /**
   * notes
   */
  @Column({ type: 'varchar', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
