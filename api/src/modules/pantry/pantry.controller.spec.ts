import { Test } from "@nestjs/testing";
import { PantryService } from "./application/pantry.service";
import { PantryController } from "./pantry.controller";

describe("PantryController", () => {
  it("delegates listing pantries to its service", async () => {
    const getPantries = jest.fn().mockResolvedValue([]);
    const module = await Test.createTestingModule({
      controllers: [PantryController],
      providers: [{ provide: PantryService, useValue: { getPantries } }],
    }).compile();
    const controller = module.get(PantryController);

    await expect(controller.getPantries()).resolves.toEqual([]);
    expect(getPantries).toHaveBeenCalledTimes(1);

    await module.close();
  });
});
