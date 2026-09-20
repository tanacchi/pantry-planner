import { Test } from "@nestjs/testing";
import { HealthController } from "./health.controller";

describe("HealthController", () => {
  it("returns an OK status and an ISO timestamp", async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();
    const controller = module.get(HealthController);

    expect(controller.check()).toEqual({
      status: "ok",
      timestamp: expect.any(String),
    });

    await module.close();
  });
});
