import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Supplier Entity
 */
@Entity('suppliers')
export class SupplierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   */
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  /**
   * contact
   */
  @Column({ type: 'varchar', nullable: true })
  contact?: string;

  /**
   * leadTime
   */
  @Column({ type: 'int', nullable: true })
  leadTime?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
