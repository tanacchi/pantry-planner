import { Item as PrismaItem } from '@prisma/client';
import { Item } from '../../domain/entity/item.entity';

export class ItemOrmMapper {
  static toDomain(prismaItem: PrismaItem): Item {
    return new Item(
      prismaItem.id,
      prismaItem.name,
      prismaItem.category,
      prismaItem.pantryId,
      prismaItem.quantity,
      prismaItem.unit,
      new Date(prismaItem.createdAt),
      new Date(prismaItem.updatedAt),
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
    };
  }
}
