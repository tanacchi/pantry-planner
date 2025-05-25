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
    // pantryIdが直接存在する場合（APIからのリクエスト）と、pantry: { connect: { id } } の両方に対応
    let pantryId: number | undefined;
    if (
      Object.prototype.hasOwnProperty.call(data, 'pantryId') &&
      typeof (data as unknown as { pantryId?: unknown }).pantryId === 'number'
    ) {
      pantryId = (data as unknown as { pantryId: number }).pantryId;
    } else if (
      'pantry' in data &&
      data.pantry &&
      typeof data.pantry === 'object' &&
      'connect' in data.pantry &&
      typeof (data.pantry as { connect?: unknown }).connect === 'object' &&
      data.pantry.connect !== null &&
      typeof (data.pantry.connect as { id?: unknown }).id === 'number'
    ) {
      pantryId = (data.pantry.connect as { id: number }).id;
    }
    if (typeof pantryId !== 'number') {
      throw new Error(
        'Invalid ItemCreateInput: pantryId or pantry.connect.id required',
      );
    }
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
