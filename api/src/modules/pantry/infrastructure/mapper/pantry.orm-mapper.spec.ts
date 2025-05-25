import { PantryOrmMapper } from './pantry.orm-mapper';

describe('PantryOrmMapper', () => {
  it('should map orm to entity', () => {
    const orm = {
      id: 1,
      name: 'p',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const entity = PantryOrmMapper.toEntity(orm);
    expect(entity).toMatchObject({ id: 1, name: 'p', userId: 1 });
  });
});
