import { Test, type TestingModule } from "@nestjs/testing";
import { HealthController } from "./health.controller";

describe("HealthController", () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  describe("check", () => {
    it("should return health status", () => {
      const result = controller.check();

      expect(result).toEqual({
        status: "ok",
        timestamp: expect.any(String),
      });
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });

    it("should return current timestamp", () => {
      const beforeCall = new Date();
      const result = controller.check();
      const afterCall = new Date();

      const resultTime = new Date(result.timestamp);
      expect(resultTime.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
      expect(resultTime.getTime()).toBeLessThanOrEqual(afterCall.getTime());
    });
  });
});
