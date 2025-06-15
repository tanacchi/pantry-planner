import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";
import type { Item } from "../domain/entity/item.entity";
import { ItemOrmMapper } from "./mapper/item.orm-mapper";

@Injectable()
export class ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Item | null> {
    const data = await this.prisma.item.findUnique({
      where: { id },
    });
    return data ? ItemOrmMapper.toDomain(data) : null;
  }

  async findByPantryId(pantryId: number, includeConsumed = false): Promise<Item[]> {
    const where = includeConsumed ? { pantryId } : { pantryId, deletedAt: null };
    console.log("includeConsumed", includeConsumed);
    console.log("where", where);
    const result = await this.prisma.item.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return result.map((item) => ItemOrmMapper.toDomain(item));
  }

  async findAll(includeConsumed = false): Promise<Item[]> {
    const where = includeConsumed ? {} : { deletedAt: null };
    const result = await this.prisma.item.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return result.map((item) => ItemOrmMapper.toDomain(item));
  }

  async create(item: Item): Promise<Item> {
    console.log("item", typeof item.expiresAt);
    const result = await this.prisma.item.create({
      data: {
        name: item.name,
        category: item.category,
        pantryId: item.pantryId,
        quantity: item.quantity,
        unit: item.unit,
        expiresAt: item.expiresAt,
      },
    });
    return ItemOrmMapper.toDomain(result);
  }

  async update(item: Item): Promise<Item> {
    const result = await this.prisma.item.update({
      where: { id: item.id },
      data: {
        ...item,
        updatedAt: new Date(),
      },
    });
    return ItemOrmMapper.toDomain(result);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.item.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
