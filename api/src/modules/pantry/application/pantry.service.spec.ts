import { Test, type TestingModule } from "@nestjs/testing";
import { ItemRepository } from "../../item/infrastructure/item.repository";
import { PantryRepository } from "../infrastructure/pantry.repository";
import { PantryService } from "./pantry.service";

const mockPantryRepository = () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockItemRepository = () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  findByPantryId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe("PantryService", () => {
  let service: PantryService;
  let pantryRepository: ReturnType<typeof mockPantryRepository>;
  let itemRepository: ReturnType<typeof mockItemRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PantryService,
        { provide: PantryRepository, useFactory: mockPantryRepository },
        { provide: ItemRepository, useFactory: mockItemRepository },
      ],
    }).compile();
    service = module.get(PantryService);
    pantryRepository = module.get(PantryRepository);
    itemRepository = module.get(ItemRepository);
  });

  it("getPantry: should return pantry", async () => {
    pantryRepository.findById.mockResolvedValue({
      id: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await service.getPantry(1);
    expect(result).toBeTruthy();
  });

  it("getPantryDetail: should return pantry detail", async () => {
    pantryRepository.findById.mockResolvedValue({
      id: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    itemRepository.findByPantryId.mockResolvedValue([
      { id: 1, name: "item1", pantryId: 1, quantity: 10 },
    ]);
    const result = await service.getPantryDetail(1);
    expect(result).toBeTruthy();
    expect(result.items.length).toBeGreaterThan(0);
  });
});
