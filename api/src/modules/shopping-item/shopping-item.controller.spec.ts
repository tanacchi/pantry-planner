import { Test } from "@nestjs/testing";
import { ShoppingItemService } from "./application/shopping-item.service";
import { ShoppingItemController } from "./shopping-item.controller";

describe("ShoppingItemController", () => {
  it("delegates listing items to its service", async () => {
    const getItemsByUserId = jest.fn().mockResolvedValue([]);
    const module = await Test.createTestingModule({
      controllers: [ShoppingItemController],
      providers: [{ provide: ShoppingItemService, useValue: { getItemsByUserId } }],
    }).compile();
    const controller = module.get(ShoppingItemController);

    await expect(controller.getItems(1)).resolves.toEqual([]);
    expect(getItemsByUserId).toHaveBeenCalledWith(1);

    await module.close();
  });
});
