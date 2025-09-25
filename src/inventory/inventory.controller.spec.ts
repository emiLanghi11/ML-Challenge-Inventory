import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';

describe('InventoryController', () => {
  let controller: InventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return inventory data for a given SKU', () => {
    const testSku = 'TEST-SKU-001';
    const result = controller.getInventory(testSku);

    expect(result).toBeDefined();
    expect(result.sku).toBe(testSku);
    expect(result.available).toBeGreaterThan(0);
    expect(typeof result.available).toBe('number');
  });
});