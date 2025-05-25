import { MessageRepository } from './message.repository';

describe('MessageRepository', () => {
  let repo: MessageRepository;

  beforeEach(() => {
    repo = new MessageRepository();
  });

  it('should send message (mock)', async () => {
    const result = await repo.send('to', 'body');
    expect(typeof result).toBe('boolean');
  });
});
