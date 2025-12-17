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
  @Column({ type: 'varchar', nullable: false })
  name: string;

  /**
   * capital
   */
  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  capital: number;

  /**
   * contact
   */
  @Column({ type: 'varchar', nullable: false })
  contact: string;

  /**
   * joinedDate - Date of joining
   */
  @Column({ type: 'date', nullable: false })
  joinedDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
