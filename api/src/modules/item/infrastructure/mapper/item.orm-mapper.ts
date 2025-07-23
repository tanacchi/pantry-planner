type PrismaCategory = 'Food' | 'Drink' | 'Snack' | 'Spice' | 'Other';
type PrismaItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: PrismaCategory;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
  pantryId: number;
  deletedAt: Date | null;
};
import { Item, ItemCategory } from '../../domain/entity/item.entity';

const categoryMapping = (category: PrismaCategory): ItemCategory => {
  switch (category) {
    case 'Food':
      return 'Food';
    case 'Drink':
      return 'Drink';
    case 'Snack':
      return 'Snack';
    case 'Spice':
      return 'Spice';
    case 'Other':
      return 'Other';
    default:
      throw new Error(`Unknown category`);
  }
};

export class ItemOrmMapper {
  static toDomain(prismaItem: PrismaItem): Item {
    return new Item(
      prismaItem.id,
      prismaItem.name,
      categoryMapping(prismaItem.category),
      prismaItem.pantryId,
      prismaItem.quantity,
      prismaItem.unit,
      new Date(prismaItem.createdAt),
      new Date(prismaItem.updatedAt),
      prismaItem.expiresAt ? new Date(prismaItem.expiresAt) : null,
    );
  }

  static toPrisma(entity: Item): PrismaItem {
    return {
      id: entity.id,
      name: entity.name,
      category: entity.category,
      pantryId: entity.pantryId,
      quantity: entity.quantity,
      unit: entity.unit,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      expiresAt: entity.expiresAt,
      deletedAt: null,
    };
  }
}
