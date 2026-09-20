import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { MockPrismaService } from "../src/infrastructure/prisma/mock-prisma.service";
import { PrismaService } from "../src/infrastructure/prisma/prisma.service";

describe("AppModule dependency injection", () => {
  it("resolves every application provider with the Prisma test double", async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(new MockPrismaService())
      .compile();

    await module.close();
  });

  it("serves the health endpoint", async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(new MockPrismaService())
      .compile();
    const app = module.createNestApplication();

    await app.init();
    await request(app.getHttpServer()).get("/health").expect(200);

    await app.close();
  });
});
