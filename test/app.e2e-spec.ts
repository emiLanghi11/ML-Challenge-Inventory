import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/inventory/:sku (GET)', () => {
    const testSku = 'TEST-SKU-001';
    return request(app.getHttpServer())
      .get(`/inventory/${testSku}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('sku', testSku);
        expect(res.body).toHaveProperty('available');
        expect(typeof res.body.available).toBe('number');
        expect(res.body.available).toBeGreaterThan(0);
      });
  });
});