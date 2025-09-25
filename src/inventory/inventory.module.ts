import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { Inventory, Reservation } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Reservation])],
  controllers: [InventoryController],
  providers: [],
  exports: [TypeOrmModule],
})
export class InventoryModule {}