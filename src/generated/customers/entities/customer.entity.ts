import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Customer Entity
 */
@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   */
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  /**
   * email
   */
  @Column({ type: 'varchar', nullable: true })
  email?: string;

  /**
   * phone
   */
  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  /**
   * loyaltyPoints
   */
  @Column({ type: 'int', nullable: true })
  loyaltyPoints?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
