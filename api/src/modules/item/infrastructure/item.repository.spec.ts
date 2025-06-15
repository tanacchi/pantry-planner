import { Test, type TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";
import { Item } from "../domain/entity/item.entity";
import { ItemRepository } from "./item.repository";
import { ItemOrmMapper } from "./mapper/item.orm-mapper";

const mockPrisma = () => ({
  item: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
});

jest.mock("./mapper/item.orm-mapper");

const mockDomainItem = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
const mockPrismaItem = {
  id: 1,
  name: "item",
  category: "Food",
  pantryId: 1,
  quantity: 1,
  unit: "個",
  createdAt: new Date(),
  updatedAt: new Date(),
  expiresAt: null,
  deletedAt: null,
};

(ItemOrmMapper.toDomain as jest.Mock).mockImplementation(() => mockDomainItem);
(ItemOrmMapper.toPrisma as jest.Mock).mockImplementation(() => mockPrismaItem);

describe.skip("ItemRepository", () => {
  let repo: ItemRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemRepository, { provide: PrismaService, useFactory: mockPrisma }],
    }).compile();
    repo = module.get(ItemRepository);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it("findById: should return domain item", async () => {
    prisma.item.findUnique.mockResolvedValue(mockPrismaItem);
    const result = await repo.findById(1);
    expect(prisma.item.findUnique).toBeCalledWith({ where: { id: 1 } });
    expect(result).toBe(mockDomainItem);
  });

  it("findById: should return null if not found", async () => {
    prisma.item.findUnique.mockResolvedValue(null);
    const result = await repo.findById(1);
    expect(result).toBeNull();
  });

  it("findByPantryId: should call prisma with correct args", async () => {
    prisma.item.findMany.mockResolvedValue([mockPrismaItem]);
    const result = await repo.findByPantryId(1, false);
    expect(prisma.item.findMany).toBeCalledWith({
      where: { pantryId: 1, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    expect(result[0]).toBe(mockDomainItem);
  });

  it("findByPantryId: should call prisma with includeConsumed true", async () => {
    prisma.item.findMany.mockResolvedValue([mockPrismaItem]);
    const result = await repo.findByPantryId(1, true);
    expect(prisma.item.findMany).toBeCalledWith({
      where: { pantryId: 1 },
      orderBy: { createdAt: "desc" },
    });
    expect(result[0]).toBe(mockDomainItem);
  });

  it("findAll: should call prisma with correct args", async () => {
    prisma.item.findMany.mockResolvedValue([mockPrismaItem]);
    const result = await repo.findAll(false);
    expect(prisma.item.findMany).toBeCalledWith({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    expect(result[0]).toBe(mockDomainItem);
  });

  it("findAll: should call prisma with includeConsumed true", async () => {
    prisma.item.findMany.mockResolvedValue([mockPrismaItem]);
    const result = await repo.findAll(true);
    expect(prisma.item.findMany).toBeCalledWith({
      where: {},
      orderBy: { createdAt: "desc" },
    });
    expect(result[0]).toBe(mockDomainItem);
  });

  it("create: should call prisma.create", async () => {
    prisma.item.create.mockResolvedValue(mockPrismaItem);
    const result = await repo.create(mockDomainItem);
    expect(prisma.item.create).toBeCalled();
    expect(result).toBe(mockDomainItem);
  });

  it("update: should call prisma.update", async () => {
    prisma.item.update.mockResolvedValue(mockPrismaItem);
    const result = await repo.update(mockDomainItem);
    expect(prisma.item.update).toBeCalled();
    expect(result).toBe(mockDomainItem);
  });

  it("update: should throw if prisma throws", async () => {
    prisma.item.update.mockRejectedValue(new Error("update error"));
    await expect(repo.update(mockDomainItem)).rejects.toThrow("update error");
  });

  it("delete: should call prisma.update for soft delete", async () => {
    prisma.item.update.mockResolvedValue(undefined);
    await repo.delete(1);
    expect(prisma.item.update).toBeCalledWith({
      where: { id: 1 },
      data: { deletedAt: expect.any(Date) as unknown as Date },
    });
  });

  it("delete: should throw if prisma throws", async () => {
    prisma.item.update.mockRejectedValue(new Error("delete error"));
    await expect(repo.delete(1)).rejects.toThrow("delete error");
  });
});
