import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ShoppingItemModule } from '../src/modules/shopping-item/shopping-item.module';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';
import { MockPrismaService } from '../src/infrastructure/prisma/mock-prisma.service';

// 必要に応じて他の依存Moduleもimportsに追加

describe('ShoppingItem E2E (MockPrismaService)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ShoppingItemModule],
    })
      .overrideProvider(PrismaService)
      .useClass(MockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create, get, update, and delete a shopping item', async () => {
    // 作成
    const createRes = await request(app.getHttpServer())
      .post('/shopping-item')
      .send({ name: 'テスト品', category: 'Food', userId: 1 })
      .expect(201);
    expect(createRes.body).toHaveProperty('id');
    const id = createRes.body.id;

    // 取得
    const getRes = await request(app.getHttpServer())
      .get(`/shopping-item/${id}`)
      .expect(200);
    expect(getRes.body.name).toBe('テスト品');

    // 更新
    await request(app.getHttpServer())
      .patch(`/shopping-item/${id}`)
      .send({ name: '更新品' })
      .expect(200);

    // 削除
    await request(app.getHttpServer())
      .delete(`/shopping-item/${id}`)
      .expect(200);
  });
});
