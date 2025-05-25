import { MessageController } from './message.controller';
import { MessageService } from './message.service';

describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  beforeEach(() => {
    service = { sendMessage: jest.fn() } as any;
    controller = new MessageController(service);
  });

  it('should call sendMessage', async () => {
    (service.sendMessage as jest.Mock).mockResolvedValue(true);
    const result = await controller.sendMessage({ to: 'to', body: 'body' });
    expect(result).toBe(true);
    expect(service.sendMessage).toBeCalledWith('to', 'body');
  });
});
