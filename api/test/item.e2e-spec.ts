import type { Server } from "http";
import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import type { ItemResponseDto } from "src/modules/item/dto/item-response.dto";
import * as request from "supertest";
import { MockPrismaService } from "../src/infrastructure/prisma/mock-prisma.service";
import { PrismaService } from "../src/infrastructure/prisma/prisma.service";
import { ItemModule } from "../src/modules/item/item.module";

describe("Item E2E (MockPrismaService)", () => {
  let app: INestApplication<Server>;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ItemModule],
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

  it("should create, get, update, and delete an item", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/items")
      .send({
        name: "りんご",
        category: "Food",
        quantity: 3,
        unit: "個",
        pantryId: 1,
      })
      .expect(201)
      .then((res) => res.body as ItemResponseDto);
    expect(createRes).toHaveProperty("id");
    createdId = createRes.id;

    const getRes = await request(app.getHttpServer())
      .get(`/items/${createdId}`)
      .expect(200)
      .then((res) => res.body as ItemResponseDto);
    expect(getRes.name).toBe("りんご");

    const listRes = await request(app.getHttpServer())
      .get("/items")
      .expect(200)
      .then((res) => res.body as ItemResponseDto[]);
    expect(Array.isArray(listRes)).toBe(true);
    expect(listRes.some((i) => i.id === createdId)).toBe(true);

    await request(app.getHttpServer())
      .put(`/items/${createdId}`)
      .send({
        name: "りんご-更新",
        category: "Food",
        quantity: 5,
        unit: "個",
        pantryId: 1,
      })
      .expect(200);
    const updatedRes = await request(app.getHttpServer())
      .get(`/items/${createdId}`)
      .expect(200)
      .then((res) => res.body as ItemResponseDto);
    expect(updatedRes.name).toBe("りんご-更新");

    await request(app.getHttpServer()).delete(`/items/${createdId}`).expect(204);
    const afterDeleteList = await request(app.getHttpServer())
      .get("/items")
      .expect(200)
      .then((res) => res.body as ItemResponseDto[]);
    expect(afterDeleteList.some((i) => i.id === createdId)).toBe(false);
  });
});
