import { Controller, Get, Param } from '@nestjs/common';
import { InventoryService, InventoryResponse } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get(':sku')
  async getInventory(@Param('sku') sku: string): Promise<InventoryResponse> {
    return await this.inventoryService.getInventory(sku);
  }
}