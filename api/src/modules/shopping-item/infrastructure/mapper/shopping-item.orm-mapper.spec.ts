import { ShoppingItemOrmMapper } from './shopping-item.orm-mapper';

describe('ShoppingItemOrmMapper', () => {
  it('should map orm to entity', () => {
    const orm = {
      id: 1,
      name: 'item',
      category: 'Food',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    } as const;
    const entity = ShoppingItemOrmMapper.toDomain(orm);
    expect(entity).toMatchObject({ id: 1, name: 'item', userId: 1 });
  });
});
