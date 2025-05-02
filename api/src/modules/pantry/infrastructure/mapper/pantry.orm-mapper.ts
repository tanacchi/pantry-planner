import { Pantry as PrismaPantry } from '@prisma/client';
import { Pantry } from '../../domain/entity/pantry.entity';

const checkPantry = (prismaPantry: PrismaPantry): prismaPantry is Pantry => {
  return (
    typeof prismaPantry === 'object' &&
    typeof prismaPantry?.id === 'string' &&
    typeof prismaPantry.userId === 'string' &&
    prismaPantry.createdAt instanceof Date &&
    prismaPantry.updatedAt instanceof Date
  );
};

export class PantryOrmMapper {
  static toDomain(prismaPantry: PrismaPantry): Pantry {
    if (!checkPantry(prismaPantry)) {
      throw new Error('Invalid PrismaPantry object');
    }
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
