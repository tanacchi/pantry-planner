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
    deletedAt: null,
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
  });

  describe('toPrisma', () => {
    it('should convert domain Item to PrismaItem correctly', () => {
      const result = ItemOrmMapper.toPrisma(domainItem);
      expect(result).toEqual(prismaItem);
    });
  });
});
