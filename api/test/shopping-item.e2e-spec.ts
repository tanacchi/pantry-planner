import type { Server } from "http";
import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { MockPrismaService } from "../src/infrastructure/prisma/mock-prisma.service";
import { PrismaService } from "../src/infrastructure/prisma/prisma.service";
import type { ShoppingItemResponseDto } from "../src/modules/shopping-item/dto/shopping-item-response.dto";
import { ShoppingItemModule } from "../src/modules/shopping-item/shopping-item.module";

describe("ShoppingItem E2E (MockPrismaService)", () => {
  let app: INestApplication<Server>;
  let createdId: number;

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

  it("should create, get, update, and delete a shopping item", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/shopping-list/items")
      .send({
        name: "牛乳",
        category: "Drink",
        userId: 1,
      })
      .expect(201)
      .then((res) => res.body as ShoppingItemResponseDto);
    expect(createRes).toHaveProperty("id");
    createdId = createRes.id;

    const getRes = await request(app.getHttpServer())
      .get(`/shopping-list/items/${createdId}`)
      .expect(200)
      .then((res) => res.body as ShoppingItemResponseDto);
    expect(getRes.name).toBe("牛乳");

    const listRes = await request(app.getHttpServer())
      .get("/shopping-list/items?userId=1")
      .expect(200)
      .then((res) => res.body as ShoppingItemResponseDto[]);
    expect(Array.isArray(listRes)).toBe(true);
    expect(listRes.some((s) => s.id === createdId)).toBe(true);

    await request(app.getHttpServer())
      .put(`/shopping-list/items/${createdId}`)
      .send({
        name: "牛乳-更新",
        category: "Drink",
        userId: 1,
      })
      .expect(200);
    const updatedRes = await request(app.getHttpServer())
      .get(`/shopping-list/items/${createdId}`)
      .expect(200)
      .then((res) => res.body as ShoppingItemResponseDto);
    expect(updatedRes.name).toBe("牛乳-更新");

    await request(app.getHttpServer()).delete(`/shopping-list/items/${createdId}`).expect(204);
    const afterDeleteList = await request(app.getHttpServer())
      .get("/shopping-list/items?userId=1")
      .expect(200)
      .then((res) => res.body as ShoppingItemResponseDto[]);
    expect(afterDeleteList.some((s) => s.id === createdId)).toBe(false);
  });
});
