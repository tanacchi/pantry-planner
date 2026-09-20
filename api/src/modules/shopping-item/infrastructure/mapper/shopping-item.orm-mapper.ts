import {
  Category as PrismaCategory,
  type ShoppingItem as PrismaShoppingItem,
} from "@prisma/client";
import { ShoppingItem } from "../../domain/entity/shopping-item.entity";

const categoryMapping = (category: PrismaCategory): string => {
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
      throw new Error("Unknown category");
  }
};

export class ShoppingItemOrmMapper {
  static toDomain(prismaItem: PrismaShoppingItem): ShoppingItem {
    return new ShoppingItem(
      prismaItem.id,
      prismaItem.name,
      categoryMapping(prismaItem.category),
      prismaItem.userId,
      new Date(prismaItem.createdAt),
      new Date(prismaItem.updatedAt),
      prismaItem.deletedAt ? new Date(prismaItem.deletedAt) : null,
    );
  }
}
