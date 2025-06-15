import { Category as PrismaCategory, type Item as PrismaItem } from "@prisma/client";
import { Item, type ItemCategory } from "../../domain/entity/item.entity";

const categoryMapping = (category: PrismaCategory): ItemCategory => {
  switch (category) {
    case PrismaCategory.Food:
      return "Food";
    case PrismaCategory.Drink:
      return "Drink";
    case PrismaCategory.Snack:
      return "Snack";
    case PrismaCategory.Spice:
      return "Spice";
    case PrismaCategory.Other:
      return "Other";
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
      prismaItem.expiresAt ? new Date(prismaItem.expiresAt) : null
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
