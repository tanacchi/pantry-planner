import { Test, type TestingModule } from "@nestjs/testing";
import { Category, type ShoppingItem } from "@prisma/client";
import type {
  CreateShoppingItemRequestDto,
  UpdateShoppingItemRequestDto,
} from "../dto/shopping-item-request.dto";
import { ShoppingItemRepository } from "../infrastructure/shopping-item.repository";
import { ShoppingItemService } from "./shopping-item.service";

describe("ShoppingItemService", () => {
  let service: ShoppingItemService;
  let repo: jest.Mocked<ShoppingItemRepository>;

  const mockItem: ShoppingItem = {
    id: 1,
    name: "item",
    category: Category.Food,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockRepo = () => ({
    findAllByUserId: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingItemService, { provide: ShoppingItemRepository, useFactory: mockRepo }],
    }).compile();
    service = module.get(ShoppingItemService);
    repo = module.get(ShoppingItemRepository);
  });

  it("getItemsByUserId: should return items", async () => {
    repo.findAllByUserId.mockResolvedValue([mockItem]);
    const result = await service.getItemsByUserId(1);
    expect(result).toEqual([{ ...mockItem }]);
    expect((repo.findAllByUserId as jest.Mock).mock.calls[0]).toEqual([1]);
  });

  it("getItem: should return item", async () => {
    repo.findById.mockResolvedValue(mockItem);
    const result = await service.getItem(1);
    expect(result).toEqual({ ...mockItem });
    expect((repo.findById as jest.Mock).mock.calls[0]).toEqual([1]);
  });

  it("getItem: should return null if not found", async () => {
    repo.findById.mockResolvedValue(null);
    const result = await service.getItem(999);
    expect(result).toBeNull();
  });

  it("createItem: should create and return item", async () => {
    repo.create.mockResolvedValue(mockItem);
    const dto: CreateShoppingItemRequestDto = {
      name: "item",
      category: Category.Food,
      userId: 1,
    };
    const result = await service.createItem(dto);
    expect(result).toEqual({ ...mockItem });
    expect((repo.create as jest.Mock).mock.calls[0]).toEqual([
      { name: "item", category: Category.Food, userId: 1 },
    ]);
  });

  it("updateItem: should update and return item", async () => {
    repo.update.mockResolvedValue(mockItem);
    const dto: UpdateShoppingItemRequestDto = {
      id: 1,
      name: "item",
      category: Category.Food,
      userId: 1,
    };
    const result = await service.updateItem(1, dto);
    expect(result).toEqual({ ...mockItem });
    expect((repo.update as jest.Mock).mock.calls[0]).toEqual([
      1,
      { name: "item", category: Category.Food },
    ]);
  });

  it("updateItem: should return null if not found", async () => {
    repo.update.mockResolvedValue(null as unknown as ShoppingItem);
    const dto: UpdateShoppingItemRequestDto = {
      id: 1,
      name: "item",
      category: Category.Food,
      userId: 1,
    };
    const result = await service.updateItem(1, dto);
    expect(result).toBeNull();
  });

  it("deleteItem: should call softDelete", async () => {
    await service.deleteItem(1);
    expect((repo.softDelete as jest.Mock).mock.calls[0]).toEqual([1]);
  });
});
