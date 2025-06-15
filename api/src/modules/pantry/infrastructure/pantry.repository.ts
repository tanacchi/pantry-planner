import { Injectable } from "@nestjs/common";
import type { PrismaService } from "../../../infrastructure/prisma/prisma.service";
import type { Pantry } from "../domain/entity/pantry.entity";
import { PantryOrmMapper } from "./mapper/pantry.orm-mapper";

@Injectable()
export class PantryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Pantry | null> {
    const result = await this.prisma.pantry.findUnique({ where: { id } });
    return result ? PantryOrmMapper.toDomain(result) : null;
  }

  async findAll(): Promise<Pantry[]> {
    const results = await this.prisma.pantry.findMany();
    return results.map((pantry) => PantryOrmMapper.toDomain(pantry));
  }

  async findByUserId(userId: number): Promise<Pantry[]> {
    const results = await this.prisma.pantry.findMany({ where: { userId } });
    return results.map((pantry) => PantryOrmMapper.toDomain(pantry));
  }

  async create(userId: number): Promise<Pantry> {
    const now = new Date();
    const result = await this.prisma.pantry.create({
      data: {
        userId,
        createdAt: now,
        updatedAt: now,
      },
    });
    return PantryOrmMapper.toDomain(result);
  }

  async update(pantry: Pantry): Promise<Pantry> {
    const result = await this.prisma.pantry.update({
      where: { id: pantry.id },
      data: {
        ...pantry,
        updatedAt: new Date(),
      },
    });
    return PantryOrmMapper.toDomain(result);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.pantry.delete({ where: { id } });
  }
}
