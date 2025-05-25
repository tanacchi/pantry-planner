import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PantryModule } from '../src/modules/pantry/pantry.module';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';
import { MockPrismaService } from '../src/infrastructure/prisma/mock-prisma.service';
import { Server } from 'http';
import { PantryResponseDto } from '../src/modules/pantry/dto/pantry-response.dto';

describe('Pantry E2E (MockPrismaService)', () => {
  let app: INestApplication<Server>;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PantryModule],
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

  it('should create, get, update, and delete a pantry', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/pantries')
      .send({ userId: 1 })
      .expect(201)
      .then((res) => res.body as PantryResponseDto);
    expect(createRes).toHaveProperty('id');
    createdId = createRes.id;

    const getRes = await request(app.getHttpServer())
      .get(`/pantries/${createdId}`)
      .expect(200)
      .then((res) => res.body as PantryResponseDto);
    expect(getRes.userId).toBe(1);

    const listRes = await request(app.getHttpServer())
      .get('/pantries')
      .expect(200)
      .then((res) => res.body as PantryResponseDto[]);
    expect(Array.isArray(listRes)).toBe(true);
    expect(listRes.some((p) => p.id === createdId)).toBe(true);

    await request(app.getHttpServer())
      .put(`/pantries/${createdId}`)
      .send({ userId: 1 })
      .expect(200);
    const updatedRes = await request(app.getHttpServer())
      .get(`/pantries/${createdId}`)
      .expect(200)
      .then((res) => res.body as PantryResponseDto);
    expect(updatedRes.userId).toBe(1);

    await request(app.getHttpServer())
      .delete(`/pantries/${createdId}`)
      .expect(204);
    const afterDeleteList = await request(app.getHttpServer())
      .get('/pantries')
      .expect(200)
      .then((res) => res.body as PantryResponseDto[]);
    expect(afterDeleteList.some((p) => p.id === createdId)).toBe(false);
  });
});
