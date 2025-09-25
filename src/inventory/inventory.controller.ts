import { Controller, Get, Param } from '@nestjs/common';

export interface InventoryResponse {
  sku: string;
  available: number;
}

@Controller('inventory')
export class InventoryController {
  @Get(':sku')
  getInventory(@Param('sku') sku: string): InventoryResponse {
    return {
      sku,
      available: Math.floor(Math.random() * 100) + 1,
    };
  }
}