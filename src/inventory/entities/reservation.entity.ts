import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  sku: string;

  @Column('varchar', { length: 255 })
  storeId: string;

  @Column('int')
  quantity: number;

  @Column('varchar', { length: 100 })
  status: string;

  @Column('varchar', { length: 255 })
  correlationId: string;

  @Column('timestamp')
  expiresAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.reservations)
  @JoinColumn({ name: 'sku', referencedColumnName: 'sku' })
  inventory: Inventory;
}
