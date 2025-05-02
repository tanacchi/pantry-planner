/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Item } from '../domain/entity/item.entity';
import { ItemOrmMapper } from './mapper/item.orm-mapper';

@Injectable()
export class ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Item | null> {
    const data = await this.prisma.item.findUnique({ where: { id } });
    return data ? ItemOrmMapper.toDomain(data) : null;
  }

  async findByPantryId(pantryId: number): Promise<Item[]> {
    const result = await this.prisma.item.findMany({
      where: { pantryId },
    });
    return result.map((item) => ItemOrmMapper.toDomain(item));
  }

  async findAll(): Promise<Item[]> {
    const result = await this.prisma.item.findMany();
    return result.map((item) => ItemOrmMapper.toDomain(item));
  }

  async create(item: Item): Promise<Item> {
    const result = await this.prisma.item.create({
      data: {
        name: item.name,
        category: item.category,
        pantryId: item.pantryId,
        quantity: item.quantity,
        unit: item.unit,
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
    await this.prisma.item.delete({ where: { id } });
  }
}
