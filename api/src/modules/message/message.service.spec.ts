import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { UserRepository } from '../user/infrastructure/user.repository';
import { CreateMessageRequestDto } from './dto';

describe('MessageService', () => {
  let service: MessageService;
  let messageRepo: jest.Mocked<MessageRepository>;
  let userRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    messageRepo = {
      send: jest.fn(),
    } as unknown as jest.Mocked<MessageRepository>;
    userRepo = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;
    service = new MessageService(messageRepo, userRepo);
  });

  it('should send message if user exists', async () => {
    userRepo.findById.mockResolvedValue({
      id: 1,
      lineUid: 'uid',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: new Date(),
    });
    messageRepo.send.mockResolvedValue();
    const dto: CreateMessageRequestDto = { userId: 1, message: 'hello' };
    await expect(service.send(dto)).resolves.toBeUndefined();
    expect((messageRepo.send as jest.Mock).mock.calls[0]).toEqual([
      'uid',
      'hello',
    ]);
  });

  it('should throw if userId is missing', async () => {
    const dto = { message: 'hello' } as unknown as CreateMessageRequestDto;
    await expect(service.send(dto)).rejects.toThrow('ユーザーIDが必要です');
  });

  it('should throw if user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    const dto: CreateMessageRequestDto = { userId: 999, message: 'hello' };
    await expect(service.send(dto)).rejects.toThrow('ユーザーが見つかりません');
  });
});
