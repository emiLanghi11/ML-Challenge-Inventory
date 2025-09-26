import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CacheService } from './cache.service';

export interface InventoryResponse {
  sku: string;
  available: number;
}

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private cacheService: CacheService,
  ) {}

  async getInventory(sku: string): Promise<InventoryResponse> {
    const cacheKey = `inventory:${sku}`;
    
    // Try to get from cache first
    const cachedValue = await this.cacheService.get(cacheKey);
    if (cachedValue) {
      const available = parseInt(cachedValue, 10);
      return { sku, available };
    }

    // If not in cache, get from database
    const inventory = await this.inventoryRepository.findOne({
      where: { sku },
    });

    const available = inventory ? inventory.quantity : 0;

    // Cache the result for 5 minutes (300 seconds)
    await this.cacheService.set(cacheKey, available.toString(), 300);

    return { sku, available };
  }
}
