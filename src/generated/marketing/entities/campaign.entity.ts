import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Campaign Entity
 */
@Entity('campaigns')
export class CampaignEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   */
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  /**
   * content
   */
  @Column({ type: 'varchar', nullable: true })
  content?: string;

  /**
   * status
   */
  @Column({ type: 'varchar', nullable: true })
  status?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
