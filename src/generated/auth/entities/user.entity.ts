import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * User Entity
 */
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name
   */
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  /**
   * role
   */
  @Column({ type: 'varchar', nullable: true, enum: ['ADMIN', 'CASHIER', 'MANAGER'] })
  role?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
