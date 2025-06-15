import { Test, type TestingModule } from "@nestjs/testing";
import { PantryService } from "./application/pantry.service";
import type { CreatePantryRequestDto } from "./dto/pantry-request.dto";
import type { PantryDetailResponseDto, PantryResponseDto } from "./dto/pantry-response.dto";
import { PantryController } from "./pantry.controller";

describe.skip("PantryController", () => {
  let controller: PantryController;
  let service: PantryService;

  const mockPantryService = {
    createPantry: jest.fn(),
    getPantries: jest.fn(),
    getPantry: jest.fn(),
    getPantryDetail: jest.fn(),
    getPantriesByUser: jest.fn(),
    getPantryDetailsByUser: jest.fn(),
    updatePantry: jest.fn(),
    deletePantry: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PantryController],
      providers: [
        {
          provide: PantryService,
          useValue: mockPantryService,
        },
      ],
    }).compile();

    controller = module.get<PantryController>(PantryController);
    service = module.get<PantryService>(PantryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPantry", () => {
    it("should create a pantry", async () => {
      const createDto: CreatePantryRequestDto = {
        userId: 1,
      };
      const expectedResult: PantryResponseDto = {
        id: 1,
        userId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockPantryService.createPantry.mockResolvedValue(expectedResult);

      const result = await controller.createPantry(createDto);

      expect(service.createPantry).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getPantries", () => {
    it("should return all pantries", async () => {
      const expectedResult: PantryResponseDto[] = [
        {
          id: 1,
          userId: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          userId: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      mockPantryService.getPantries.mockResolvedValue(expectedResult);

      const result = await controller.getPantries();

      expect(service.getPantries).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getPantry", () => {
    it("should return a pantry by id", async () => {
      const pantryId = 1;
      const expectedResult: PantryResponseDto = {
        id: pantryId,
        userId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockPantryService.getPantry.mockResolvedValue(expectedResult);

      const result = await controller.getPantry(pantryId);

      expect(service.getPantry).toHaveBeenCalledWith(pantryId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getPantryDetail", () => {
    it("should return pantry detail by id", async () => {
      const pantryId = 1;
      const expectedResult: PantryDetailResponseDto = {
        id: pantryId,
        userId: 1,
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockPantryService.getPantryDetail.mockResolvedValue(expectedResult);

      const result = await controller.getPantryDetail(pantryId);

      expect(service.getPantryDetail).toHaveBeenCalledWith(pantryId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getPantriesByUser", () => {
    it("should return pantries by user id", async () => {
      const userId = 1;
      const expectedResult: PantryResponseDto[] = [
        {
          id: 1,
          userId: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      mockPantryService.getPantriesByUser.mockResolvedValue(expectedResult);

      const result = await controller.getPantriesByUser(userId);

      expect(service.getPantriesByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getPantryDetailsByUser", () => {
    it("should return pantry details by user id", async () => {
      const userId = 1;
      const expectedResult: PantryDetailResponseDto[] = [
        {
          id: 1,
          userId: userId,
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      mockPantryService.getPantryDetailsByUser.mockResolvedValue(expectedResult);

      const result = await controller.getPantryDetailsByUser(userId);

      expect(service.getPantryDetailsByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("updatePantry", () => {
    it("should update a pantry", async () => {
      const pantryId = 1;
      const updateDto: CreatePantryRequestDto = {
        userId: 1,
      };
      const expectedResult: PantryResponseDto = {
        id: pantryId,
        userId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockPantryService.updatePantry.mockResolvedValue(expectedResult);

      const result = await controller.updatePantry(pantryId, updateDto);

      expect(service.updatePantry).toHaveBeenCalledWith(pantryId, updateDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("deletePantry", () => {
    it("should delete a pantry", async () => {
      const pantryId = 1;

      mockPantryService.deletePantry.mockResolvedValue(undefined);

      await controller.deletePantry(pantryId);

      expect(service.deletePantry).toHaveBeenCalledWith(pantryId);
    });
  });
});
