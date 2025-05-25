import { User } from './user.entity';

describe('User Entity', () => {
  it('should create user entity', () => {
    const user = new User(1, 'line-uid', new Date(), new Date(), new Date());
    expect(user.id).toBe(1);
    expect(user.lineUid).toBe('line-uid');
  });
});
