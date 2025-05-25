import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/modules/user/user.module';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';
import { MockPrismaService } from '../src/infrastructure/prisma/mock-prisma.service';
import { UserResponseDto } from '../src/modules/user/dto/user-response.dto';
import { Server } from 'http';

describe('User E2E (MockPrismaService)', () => {
  let app: INestApplication<Server>;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
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

  it('should create, get, update, and delete a user', async () => {
    // 1. Create
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .send({ lineUid: 'line-uid-1' })
      .expect(201)
      .then((res) => res.body as UserResponseDto);
    expect(createRes).toHaveProperty('id');
    createdId = createRes.id;

    const getRes = await request(app.getHttpServer())
      .get(`/users/${createdId}`)
      .expect(200)
      .then((res) => res.body as UserResponseDto);
    expect(getRes.lineUid).toBe('line-uid-1');

    const listRes = await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((res) => res.body as UserResponseDto[]);
    expect(Array.isArray(listRes)).toBe(true);
    expect(listRes.some((u) => u.id === createdId)).toBe(true);

    await request(app.getHttpServer())
      .put(`/users/${createdId}`)
      .send({ lineUid: 'line-uid-1-updated' })
      .expect(200);
    const updatedRes = await request(app.getHttpServer())
      .get(`/users/${createdId}`)
      .expect(200)
      .then((res) => res.body as UserResponseDto);
    expect(updatedRes.lineUid).toBe('line-uid-1-updated');

    await request(app.getHttpServer())
      .delete(`/users/${createdId}`)
      .expect(204);
    const afterDeleteList = await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((res) => res.body as UserResponseDto[]);
    expect(afterDeleteList.some((u) => u.id === createdId)).toBe(false);
  });
});
