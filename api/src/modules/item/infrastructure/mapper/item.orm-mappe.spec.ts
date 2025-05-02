import { ItemOrmMapper } from './item.orm-mapper';
import { Item } from '../../domain/entity/item.entity';
import { Category as PrismaCategory, Item as PrismaItem } from '@prisma/client';

describe('ItemOrmMapper', () => {
  const now = new Date();

  const prismaItem: PrismaItem = {
    id: 1,
    name: 'しょうゆ',
    category: PrismaCategory.Spice,
    pantryId: 42,
    quantity: 2,
    unit: '本',
    createdAt: now,
    updatedAt: now,
    expiresAt: null,
  };

  const domainItem = new Item(
    1,
    'しょうゆ',
    'Spice',
    42,
    2,
    '本',
    now,
    now,
    null,
  );

  describe('toDomain', () => {
    it('should convert PrismaItem to domain Item correctly', () => {
      const result = ItemOrmMapper.toDomain(prismaItem);
      expect(result).toBeInstanceOf(Item);
      expect(result).toEqual(domainItem);
    });

    it('should throw an error if unknown category is passed', () => {
      const invalidItem = {
        ...prismaItem,
        category: 'Unknown' as PrismaCategory,
      };
      expect(() => ItemOrmMapper['toDomain'](invalidItem)).toThrow(
        'Unknown category',
      );
    });
  });

  describe('toPrisma', () => {
    it('should convert domain Item to PrismaItem correctly', () => {
      const result = ItemOrmMapper.toPrisma(domainItem);
      expect(result).toEqual(prismaItem);
    });
  });
});
