import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './application/user.service';
import { CreateUserRequestDto } from './dto/user-request.dto';

const mockUserService = () => ({
  createUser: jest.fn(),
  getUsers: jest.fn(),
  getUser: jest.fn(),
  getUserDetail: jest.fn(),
  getUserByLineUid: jest.fn(),
  getUserDetailByLineUid: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
});

describe('UserController', () => {
  let controller: UserController;
  let userService: ReturnType<typeof mockUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useFactory: mockUserService }],
    }).compile();
    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('createUser', async () => {
    const dto: CreateUserRequestDto = { lineUid: 'line-uid-1' };
    userService.createUser.mockResolvedValue({ id: 1 });
    const result = await controller.createUser(dto);
    expect(userService.createUser).toBeCalledWith(dto);
    expect(result).toHaveProperty('id', 1);
  });

  it('getUsers', async () => {
    userService.getUsers.mockResolvedValue([{ id: 1 }]);
    const result = await controller.getUsers();
    expect(result.length).toBe(1);
  });

  it('getUser', async () => {
    userService.getUser.mockResolvedValue({ id: 1 });
    const result = await controller.getUser(1);
    expect(result).toHaveProperty('id', 1);
  });

  it('getUserDetail', async () => {
    userService.getUserDetail.mockResolvedValue({ id: 1 });
    const result = await controller.getUserDetail(1);
    expect(result).toHaveProperty('id', 1);
  });

  it('getUserByLineUid', async () => {
    userService.getUserByLineUid.mockResolvedValue({ id: 1 });
    const result = await controller.getUserByLineUid('line-uid-1');
    expect(result).toHaveProperty('id', 1);
  });

  it('getUserDetailByLineUid', async () => {
    userService.getUserDetailByLineUid.mockResolvedValue({ id: 1 });
    const result = await controller.getUserDetailByLineUid('line-uid-1');
    expect(result).toHaveProperty('id', 1);
  });

  it('updateUser', async () => {
    userService.updateUser.mockResolvedValue({ id: 1 });
    const result = await controller.updateUser(1, { lineUid: 'new' });
    expect(userService.updateUser).toBeCalledWith(1, { lineUid: 'new' });
    expect(result).toHaveProperty('id', 1);
  });

  it('deleteUser', async () => {
    userService.deleteUser.mockResolvedValue(undefined);
    await expect(controller.deleteUser(1)).resolves.toBeUndefined();
    expect(userService.deleteUser).toBeCalledWith(1);
  });
});
