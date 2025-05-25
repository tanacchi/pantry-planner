import { PantryService } from './pantry.service';
import { PantryRepository } from '../infrastructure/pantry.repository';

describe('PantryService', () => {
  let service: PantryService;
  let repo: jest.Mocked<PantryRepository>;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      findAllByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    } as any;
    service = new PantryService(repo);
  });

  it('findById: should return pantry', async () => {
    repo.findById.mockResolvedValue({
      id: 1,
      name: 'p',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    const result = await service.findById(1);
    expect(result).toBeTruthy();
  });

  it('findById: should return null if not found', async () => {
    repo.findById.mockResolvedValue(null);
    const result = await service.findById(999);
    expect(result).toBeNull();
  });

  it('create: should call create', async () => {
    repo.create.mockResolvedValue({
      id: 1,
      name: 'p',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    const result = await service.create({ name: 'p', userId: 1 });
    expect(result).toBeTruthy();
    expect(repo.create).toBeCalled();
  });
});
