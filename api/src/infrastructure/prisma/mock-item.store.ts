/* eslint-disable @typescript-eslint/require-await */
import { Item, Prisma } from '@prisma/client';
import { findById } from './mock-util';

export class MockItemStore {
  private items: Item[] = [];
  private idSeq = 1;

  findUnique = async ({ where }: { where: Prisma.ItemWhereUniqueInput }) => {
    if (where.id !== undefined)
      return this.items.find((i) => i.id === where.id) ?? null;
    return null;
  };
  findMany = async ({ where }: { where?: Prisma.ItemWhereInput } = {}) => {
    if (!where) return [...this.items];
    return this.items.filter((i) => {
      if (where.pantryId !== undefined && i.pantryId !== where.pantryId)
        return false;
      if (where.deletedAt === null && i.deletedAt !== null) return false;
      return true;
    });
  };
  create = async ({ data }: { data: Prisma.ItemCreateInput }) => {
    const pantryId = (data.pantry as { connect: { id: number } }).connect.id;
    const item: Item = {
      id: this.idSeq++,
      pantryId,
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
      category: data.category,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: (data.expiresAt as Date) ?? null,
      deletedAt: null,
    };
    this.items.push(item);
    return item;
  };
  update = async ({
    where,
    data,
  }: {
    where: Prisma.ItemWhereUniqueInput;
    data: Partial<Item>;
  }) => {
    const item = findById(this.items, where.id!);
    if (!item) throw new Error('Item not found');
    Object.assign(item, data, { updatedAt: new Date() });
    return item;
  };
  delete = async ({ where }: { where: Prisma.ItemWhereUniqueInput }) => {
    const idx = this.items.findIndex((i) => i.id === where.id);
    if (idx === -1) throw new Error('Item not found');
    const [deleted] = this.items.splice(idx, 1);
    return deleted;
  };
}
