import { Test, type TestingModule } from "@nestjs/testing";
import { ItemService } from "./application/item.service";
import type { CreateItemRequestDto } from "./dto/item-request.dto";
import { ItemController } from "./item.controller";

const mockItemService = () => ({
  createItem: jest.fn(),
  getItems: jest.fn(),
  getItem: jest.fn(),
  updateItem: jest.fn(),
  deleteItem: jest.fn(),
  getItemsByPantry: jest.fn(),
});

describe.skip("ItemController", () => {
  let controller: ItemController;
  let itemService: ReturnType<typeof mockItemService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [{ provide: ItemService, useFactory: mockItemService }],
    }).compile();
    controller = module.get<ItemController>(ItemController);
    itemService = module.get(ItemService);
  });

  it("createItem", async () => {
    const dto: CreateItemRequestDto = {
      name: "item",
      category: "Food",
      quantity: 1,
      unit: "個",
      pantryId: 1,
    };
    itemService.createItem.mockResolvedValue({ id: 1 });
    const result = await controller.createItem(dto);
    expect(itemService.createItem).toBeCalledWith(dto);
    expect(result).toHaveProperty("id", 1);
  });

  it("getItems", async () => {
    itemService.getItems.mockResolvedValue([{ id: 1 }]);
    const result = await controller.getItems(false, [], []);
    expect(result.length).toBe(1);
  });

  it("getItem", async () => {
    itemService.getItem.mockResolvedValue({ id: 1 });
    const result = await controller.getItem(1);
    expect(result).toHaveProperty("id", 1);
  });

  it("updateItem", async () => {
    itemService.updateItem.mockResolvedValue({ id: 1 });
    const result = await controller.updateItem(1, {
      name: "item",
      category: "Food",
      quantity: 1,
      unit: "個",
      pantryId: 1,
    });
    expect(itemService.updateItem).toBeCalledWith(1, {
      name: "item",
      category: "Food",
      quantity: 1,
      unit: "個",
      pantryId: 1,
    });
    expect(result).toHaveProperty("id", 1);
  });

  it("deleteItem", async () => {
    itemService.deleteItem.mockResolvedValue(undefined);
    await expect(controller.deleteItem(1)).resolves.toBeUndefined();
    expect(itemService.deleteItem).toBeCalledWith(1);
  });

  it("getItemsByPantry", async () => {
    itemService.getItemsByPantry.mockResolvedValue([{ id: 1 }]);
    const result = await controller.getItemsByPantry(1, false);
    expect(itemService.getItemsByPantry).toBeCalledWith(1, false);
    expect(result.length).toBe(1);
  });
});
