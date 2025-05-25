import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../infrastructure/user.repository';
import { PantryRepository } from '../../pantry/infrastructure/pantry.repository';
import { ItemRepository } from '../../item/infrastructure/item.repository';
import { CreateUserRequestDto } from '../dto/user-request.dto';
import { User } from '../domain/entity/user.entity';

// モック生成
const mockUserRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByLineUid: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
const mockPantryRepository = () => ({
  create: jest.fn(),
  findByUserId: jest.fn(),
});
const mockItemRepository = () => ({
  findByPantryId: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userRepository: ReturnType<typeof mockUserRepository>;
  let pantryRepository: ReturnType<typeof mockPantryRepository>;
  let itemRepository: ReturnType<typeof mockItemRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: PantryRepository, useFactory: mockPantryRepository },
        { provide: ItemRepository, useFactory: mockItemRepository },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
    pantryRepository = module.get(PantryRepository);
    itemRepository = module.get(ItemRepository);
  });

  it('createUser: should create user and pantry', async () => {
    const dto: CreateUserRequestDto = { lineUid: 'line-uid-1' };
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.create.mockResolvedValue(user);
    pantryRepository.create.mockResolvedValue({
      id: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await service.createUser(dto);
    expect(userRepository.create).toBeCalledWith('line-uid-1');
    expect(pantryRepository.create).toBeCalledWith(1);
    expect(result).toHaveProperty('id', 1);
  });

  it('getUsers: should return user list', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findAll.mockResolvedValue([user]);
    const result = await service.getUsers();
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id', 1);
  });

  it('getUser: should return user', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findById.mockResolvedValue(user);
    const result = await service.getUser(1);
    expect(result).toHaveProperty('id', 1);
  });

  it('getUser: should throw if not found', async () => {
    userRepository.findById.mockResolvedValue(null);
    await expect(service.getUser(1)).rejects.toThrow('User not found');
  });

  it('updateUser: should update user', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findById.mockResolvedValue(user);
    userRepository.update.mockResolvedValue(user);
    const result = await service.updateUser(1, { lineUid: 'new' });
    expect(userRepository.update).toBeCalled();
    expect(result).toHaveProperty('id', 1);
  });

  it('deleteUser: should call repository', async () => {
    userRepository.delete.mockResolvedValue(undefined);
    await service.deleteUser(1);
    expect(userRepository.delete).toBeCalledWith(1);
  });

  it('getUserDetail: should return user detail', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findById.mockResolvedValue(user);
    pantryRepository.findByUserId.mockResolvedValue([
      { id: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
    itemRepository.findByPantryId.mockResolvedValue([]);
    const result = await service.getUserDetail(1);
    expect(result).toHaveProperty('id', 1);
    expect(pantryRepository.findByUserId).toBeCalledWith(1);
    expect(itemRepository.findByPantryId).toBeCalledWith(1);
  });

  it('getUserDetail: should throw if user not found', async () => {
    userRepository.findById.mockResolvedValue(null);
    await expect(service.getUserDetail(1)).rejects.toThrow('User not found');
  });

  it('getUserDetail: should throw if pantry not found', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findById.mockResolvedValue(user);
    pantryRepository.findByUserId.mockResolvedValue([]);
    await expect(service.getUserDetail(1)).rejects.toThrow('Pantry not found');
  });

  it('getUserByLineUid: should return user', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findByLineUid.mockResolvedValue(user);
    const result = await service.getUserByLineUid('line-uid-1');
    expect(result).toHaveProperty('id', 1);
  });

  it('getUserByLineUid: should throw if not found', async () => {
    userRepository.findByLineUid.mockResolvedValue(null);
    await expect(service.getUserByLineUid('line-uid-1')).rejects.toThrow(
      'User not found',
    );
  });

  it('getUserDetailByLineUid: should return user detail', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findByLineUid.mockResolvedValue(user);
    pantryRepository.findByUserId.mockResolvedValue([
      { id: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
    itemRepository.findByPantryId.mockResolvedValue([]);
    const result = await service.getUserDetailByLineUid('line-uid-1');
    expect(result).toHaveProperty('id', 1);
  });

  it('getUserDetailByLineUid: should throw if user not found', async () => {
    userRepository.findByLineUid.mockResolvedValue(null);
    await expect(service.getUserDetailByLineUid('line-uid-1')).rejects.toThrow(
      'User not found',
    );
  });

  it('getUserDetailByLineUid: should throw if pantry not found', async () => {
    const user = new User(1, 'line-uid-1', new Date(), new Date(), new Date());
    userRepository.findByLineUid.mockResolvedValue(user);
    pantryRepository.findByUserId.mockResolvedValue([]);
    await expect(service.getUserDetailByLineUid('line-uid-1')).rejects.toThrow(
      'Pantry not found',
    );
  });
});
