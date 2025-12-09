import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Partner Entity
 */
@Entity('partners')
export class PartnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   */
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  /**
   * capital
   */
  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
  capital?: number;

  /**
   * contact
   */
  @Column({ type: 'varchar', nullable: true })
  contact?: string;

  /**
   * joinedDate
   */
  @Column({ type: 'date', nullable: true })
  joinedDate?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
