import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { CacheService } from './cache.service';
import { Inventory, Reservation } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Reservation])],
  controllers: [InventoryController],
  providers: [InventoryService, CacheService],
  exports: [InventoryService, CacheService, TypeOrmModule],
})
export class InventoryModule {}