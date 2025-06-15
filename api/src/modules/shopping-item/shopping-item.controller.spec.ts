import { Test, type TestingModule } from "@nestjs/testing";
import { ShoppingItemService } from "./application/shopping-item.service";
import type {
  CreateShoppingItemRequestDto,
  UpdateShoppingItemRequestDto,
} from "./dto/shopping-item-request.dto";
import type { ShoppingItemResponseDto } from "./dto/shopping-item-response.dto";
import { ShoppingItemController } from "./shopping-item.controller";

describe("ShoppingItemController", () => {
  let controller: ShoppingItemController;
  let service: ShoppingItemService;

  const mockShoppingItemService = {
    getItemsByUserId: jest.fn(),
    getItem: jest.fn(),
    createItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingItemController],
      providers: [
        {
          provide: ShoppingItemService,
          useValue: mockShoppingItemService,
        },
      ],
    }).compile();

    controller = module.get<ShoppingItemController>(ShoppingItemController);
    service = module.get<ShoppingItemService>(ShoppingItemService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getItems", () => {
    it("should return shopping items by user id", async () => {
      const userId = 1;
      const expectedResult: ShoppingItemResponseDto[] = [
        {
          id: 1,
          name: "Test Item",
          category: "Food",
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockShoppingItemService.getItemsByUserId.mockResolvedValue(expectedResult);

      const result = await controller.getItems(userId);

      expect(service.getItemsByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getItem", () => {
    it("should return a shopping item by id", async () => {
      const itemId = 1;
      const expectedResult: ShoppingItemResponseDto = {
        id: itemId,
        name: "Test Item",
        category: "Food",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockShoppingItemService.getItem.mockResolvedValue(expectedResult);

      const result = await controller.getItem(itemId);

      expect(service.getItem).toHaveBeenCalledWith(itemId);
      expect(result).toEqual(expectedResult);
    });

    it("should return null when item not found", async () => {
      const itemId = 999;

      mockShoppingItemService.getItem.mockResolvedValue(null);

      const result = await controller.getItem(itemId);

      expect(service.getItem).toHaveBeenCalledWith(itemId);
      expect(result).toBeNull();
    });
  });

  describe("createItem", () => {
    it("should create a shopping item", async () => {
      const createDto: CreateShoppingItemRequestDto = {
        name: "New Item",
        category: "Food",
        userId: 1,
      };
      const expectedResult: ShoppingItemResponseDto = {
        id: 1,
        name: "New Item",
        category: "Food",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockShoppingItemService.createItem.mockResolvedValue(expectedResult);

      const result = await controller.createItem(createDto);

      expect(service.createItem).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("updateItem", () => {
    it("should update a shopping item", async () => {
      const itemId = 1;
      const updateDto: UpdateShoppingItemRequestDto = {
        id: itemId,
        userId: 1,
        name: "Updated Item",
        category: "Food",
      };
      const expectedResult: ShoppingItemResponseDto = {
        id: itemId,
        name: "Updated Item",
        category: "Food",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockShoppingItemService.updateItem.mockResolvedValue(expectedResult);

      const result = await controller.updateItem(itemId, updateDto);

      expect(service.updateItem).toHaveBeenCalledWith(itemId, updateDto);
      expect(result).toEqual(expectedResult);
    });

    it("should return null when updating non-existent item", async () => {
      const itemId = 999;
      const updateDto: UpdateShoppingItemRequestDto = {
        id: itemId,
        category: "Food",
        userId: 1,
        name: "Updated Item",
      };

      mockShoppingItemService.updateItem.mockResolvedValue(null);

      const result = await controller.updateItem(itemId, updateDto);

      expect(service.updateItem).toHaveBeenCalledWith(itemId, updateDto);
      expect(result).toBeNull();
    });
  });

  describe("deleteItem", () => {
    it("should delete a shopping item", async () => {
      const itemId = 1;

      mockShoppingItemService.deleteItem.mockResolvedValue(undefined);

      await controller.deleteItem(itemId);

      expect(service.deleteItem).toHaveBeenCalledWith(itemId);
    });
  });
});
