/* eslint-disable @typescript-eslint/require-await */
import { Pantry, Prisma } from '@prisma/client';
import { findById } from './mock-util';

export class MockPantryStore {
  private pantries: Pantry[] = [];
  private idSeq = 1;

  findUnique = async ({ where }: { where: Prisma.PantryWhereUniqueInput }) => {
    if (where.id !== undefined)
      return this.pantries.find((p) => p.id === where.id) ?? null;
    return null;
  };
  findMany = async ({ where }: { where?: Prisma.PantryWhereInput } = {}) => {
    if (!where) return [...this.pantries];
    return this.pantries.filter((p) => {
      if (where.userId !== undefined && p.userId !== where.userId) return false;
      return true;
    });
  };
  create = async ({ data }: { data: Prisma.PantryCreateInput }) => {
    const userId = (data.user as { connect: { id: number } }).connect.id;
    const pantry: Pantry = {
      id: this.idSeq++,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.pantries.push(pantry);
    return pantry;
  };
  update = async ({
    where,
    data,
  }: {
    where: Prisma.PantryWhereUniqueInput;
    data: Partial<Pantry>;
  }) => {
    const pantry = findById(this.pantries, where.id!);
    if (!pantry) throw new Error('Pantry not found');
    Object.assign(pantry, data, { updatedAt: new Date() });
    return pantry;
  };
  delete = async ({ where }: { where: Prisma.PantryWhereUniqueInput }) => {
    const idx = this.pantries.findIndex((p) => p.id === where.id);
    if (idx === -1) throw new Error('Pantry not found');
    const [deleted] = this.pantries.splice(idx, 1);
    return deleted;
  };
}
