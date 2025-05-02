/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Category as PrismaCategory, Item as PrismaItem } from '@prisma/client';
import { Item, Category } from '../../domain/entity/item.entity';

const categoryMapping = (category: PrismaCategory): Category => {
  switch (category) {
    case PrismaCategory.Food:
      return Category.Food;
    case PrismaCategory.Drink:
      return Category.Drink;
    case PrismaCategory.Snack:
      return Category.Snack;
    case PrismaCategory.Spice:
      return Category.Spice;
    case PrismaCategory.Other:
      return Category.Other;
    default:
      throw new Error(`Unknown category: ${category}`);
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
    };
  }
}
