import { Test, type TestingModule } from "@nestjs/testing";
import { Item } from "../domain/entity/item.entity";
import type { CreateItemRequestDto } from "../dto/item-request.dto";
import { ItemRepository } from "../infrastructure/item.repository";
import { ItemService } from "./item.service";

const mockItemRepository = () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByPantryId: jest.fn(),
});

describe("ItemService", () => {
  let service: ItemService;
  let itemRepository: ReturnType<typeof mockItemRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, { provide: ItemRepository, useFactory: mockItemRepository }],
    }).compile();
    service = module.get<ItemService>(ItemService);
    itemRepository = module.get(ItemRepository);
  });

  it("createItem: should create item", async () => {
    const dto: CreateItemRequestDto = {
      name: "item",
      category: "Food",
      quantity: 1,
      unit: "個",
      pantryId: 1,
    };
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    itemRepository.create.mockResolvedValue(item);
    const result = await service.createItem(dto);
    expect(itemRepository.create).toBeCalled();
    expect(result).toHaveProperty("id", 1);
  });

  it("getItem: should return item", async () => {
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    itemRepository.findById.mockResolvedValue(item);
    const result = await service.getItem(1);
    expect(result).toHaveProperty("id", 1);
  });

  it("getItem: should throw if not found", async () => {
    itemRepository.findById.mockResolvedValue(null);
    await expect(service.getItem(1)).rejects.toThrow("Item not found");
  });

  it("getItems: should return item list", async () => {
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    itemRepository.findAll.mockResolvedValue([item]);
    const result = await service.getItems({});
    expect(result.length).toBe(1);
  });

  it("updateItem: should update item", async () => {
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    itemRepository.findById.mockResolvedValue(item);
    itemRepository.update.mockResolvedValue(item);
    const result = await service.updateItem(1, {
      name: "item",
      category: "Food",
      quantity: 1,
      unit: "個",
      pantryId: 1,
    });
    expect(itemRepository.update).toBeCalled();
    expect(result).toHaveProperty("id", 1);
  });

  it("updateItem: should throw if not found", async () => {
    itemRepository.findById.mockResolvedValue(null);
    await expect(
      service.updateItem(1, {
        name: "item",
        category: "Food",
        quantity: 1,
        unit: "個",
        pantryId: 1,
      }),
    ).rejects.toThrow("Item not found");
  });

  it("deleteItem: should call repository", async () => {
    itemRepository.delete.mockResolvedValue(undefined);
    await service.deleteItem(1);
    expect(itemRepository.delete).toBeCalledWith(1);
  });

  it("getItemsByPantry: should return items", async () => {
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    itemRepository.findByPantryId.mockResolvedValue([item]);
    const result = await service.getItemsByPantry(1, false);
    expect(result.length).toBe(1);
    expect(itemRepository.findByPantryId).toBeCalledWith(1, false);
  });

  it("getItems: should call repository with includeConsumed true", async () => {
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    itemRepository.findAll.mockResolvedValue([item]);
    const result = await service.getItems({ includeConsumed: true });
    expect(itemRepository.findAll).toBeCalledWith(true);
    expect(result.length).toBe(1);
  });

  it("getItemsByPantry: should call repository with includeConsumed true", async () => {
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    itemRepository.findByPantryId.mockResolvedValue([item]);
    const result = await service.getItemsByPantry(1, true);
    expect(itemRepository.findByPantryId).toBeCalledWith(1, true);
    expect(result.length).toBe(1);
  });

  it("deleteItem: should throw if repository throws", async () => {
    itemRepository.delete.mockRejectedValue(new Error("delete error"));
    await expect(service.deleteItem(1)).rejects.toThrow("delete error");
  });
});
