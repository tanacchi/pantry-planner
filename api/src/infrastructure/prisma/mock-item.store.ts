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
  create = async ({
    data,
  }: {
    data: Prisma.ItemCreateInput | Prisma.ItemUncheckedCreateInput;
  }) => {
    let pantryId: number | undefined;
    if (
      Object.prototype.hasOwnProperty.call(data, 'pantryId') &&
      typeof (data as { pantryId?: unknown }).pantryId === 'number'
    ) {
      pantryId = (data as { pantryId: number }).pantryId;
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
    const name = 'name' in data ? data.name : '';
    const quantity =
      'quantity' in data && typeof data.quantity === 'number'
        ? data.quantity
        : 1;
    const unit = 'unit' in data ? data.unit : '';
    const category = 'category' in data ? data.category : 'Food';
    const expiresAt =
      'expiresAt' in data ? (data.expiresAt as Date | null | undefined) : null;
    const item: Item = {
      id: this.idSeq++,
      pantryId,
      name,
      quantity,
      unit,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: expiresAt ?? null,
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
