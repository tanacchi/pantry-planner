import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

const mockMessageService = () => ({
  send: jest.fn(),
});

describe('MessageController', () => {
  let controller: MessageController;
  let service: ReturnType<typeof mockMessageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [{ provide: MessageService, useFactory: mockMessageService }],
    }).compile();
    controller = module.get<MessageController>(MessageController);
    service = module.get(MessageService);
  });

  it('should call sendMessage', async () => {
    await controller.createMessage({
      userId: 1,
      message: 'body',
    });
    expect(service.send).toBeCalledWith({ userId: 1, message: 'body' });
  });
});
