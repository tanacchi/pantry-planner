import type { Pantry as PrismaPantry } from "@prisma/client";
import { Pantry } from "../../domain/entity/pantry.entity";

export class PantryOrmMapper {
  static toDomain(prismaPantry: PrismaPantry): Pantry {
    return new Pantry(
      prismaPantry.id,
      prismaPantry.userId,
      new Date(prismaPantry.createdAt),
      new Date(prismaPantry.updatedAt),
    );
  }

  static toPrisma(pantry: Pantry): PrismaPantry {
    return {
      id: pantry.id,
      userId: pantry.userId,
      createdAt: pantry.createdAt,
      updatedAt: pantry.updatedAt,
    };
  }
}
