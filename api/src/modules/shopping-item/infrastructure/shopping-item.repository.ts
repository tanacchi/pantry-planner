import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ShoppingItem } from '../domain/entity/shopping-item.entity';
import { Category, ShoppingItem as PrismaShoppingItem } from '@prisma/client';

// Mapperを追加（item.repository.tsに倣う）
class ShoppingItemOrmMapper {
  static toDomain(item: PrismaShoppingItem): ShoppingItem {
    return new ShoppingItem(
      item.id,
      item.name,
      item.category,
      item.userId,
      item.createdAt,
      item.updatedAt,
      item.deletedAt ?? null,
    );
  }
}

@Injectable()
export class ShoppingItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: number, includeDeleted = false): Promise<ShoppingItem[]> {
    const where = includeDeleted ? { userId } : { userId, deletedAt: null };
    const result = await this.prisma.shoppingItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return result.map((item) => ShoppingItemOrmMapper.toDomain(item));
  }

  async findById(id: number): Promise<ShoppingItem | null> {
    const data = await this.prisma.shoppingItem.findUnique({ where: { id } });
    return data ? ShoppingItemOrmMapper.toDomain(data) : null;
  }

  async create(data: { name: string; category: string; userId: number }): Promise<ShoppingItem> {
    const result = await this.prisma.shoppingItem.create({
      data: {
        name: data.name,
        category: data.category as Category,
        userId: data.userId,
      },
    });
    return ShoppingItemOrmMapper.toDomain(result);
  }

  async update(id: number, data: { name?: string; category?: string }): Promise<ShoppingItem> {
    const result = await this.prisma.shoppingItem.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.category && { category: data.category as Category }),
        updatedAt: new Date(),
      },
    });
    return ShoppingItemOrmMapper.toDomain(result);
  }

  async softDelete(id: number): Promise<void> {
    await this.prisma.shoppingItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
