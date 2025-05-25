/* eslint-disable @typescript-eslint/require-await */
import { ShoppingItem, Prisma } from '@prisma/client';
import { findById } from './mock-util';

export class MockShoppingItemStore {
  private shoppingItems: ShoppingItem[] = [];
  private idSeq = 1;

  findUnique = async ({
    where,
  }: {
    where: Prisma.ShoppingItemWhereUniqueInput;
  }) => {
    if (where.id !== undefined)
      return this.shoppingItems.find((s) => s.id === where.id) ?? null;
    return null;
  };
  findMany = async ({
    where,
  }: { where?: Prisma.ShoppingItemWhereInput } = {}) => {
    if (!where) return [...this.shoppingItems];
    return this.shoppingItems.filter((s) => {
      if (where.userId !== undefined && s.userId !== where.userId) return false;
      if (where.deletedAt === null && s.deletedAt !== null) return false;
      return true;
    });
  };
  create = async ({ data }: { data: Prisma.ShoppingItemCreateInput }) => {
    let userId: number | undefined;
    if (
      Object.prototype.hasOwnProperty.call(data, 'userId') &&
      typeof (data as unknown as { userId?: unknown }).userId === 'number'
    ) {
      userId = (data as unknown as { userId: number }).userId;
    } else if (
      'user' in data &&
      data.user &&
      typeof data.user === 'object' &&
      'connect' in data.user &&
      typeof (data.user as { connect?: unknown }).connect === 'object' &&
      data.user.connect !== null &&
      typeof (data.user.connect as { id?: unknown }).id === 'number'
    ) {
      userId = (data.user.connect as { id: number }).id;
    }
    if (typeof userId !== 'number') {
      throw new Error(
        'Invalid ShoppingItemCreateInput: userId or user.connect.id required',
      );
    }
    const shoppingItem: ShoppingItem = {
      id: this.idSeq++,
      userId,
      name: data.name,
      category: data.category,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    this.shoppingItems.push(shoppingItem);
    return shoppingItem;
  };
  update = async ({
    where,
    data,
  }: {
    where: Prisma.ShoppingItemWhereUniqueInput;
    data: Partial<ShoppingItem>;
  }) => {
    const shoppingItem = findById(this.shoppingItems, where.id!);
    if (!shoppingItem) throw new Error('ShoppingItem not found');
    Object.assign(shoppingItem, data, { updatedAt: new Date() });
    return shoppingItem;
  };
  delete = async ({
    where,
  }: {
    where: Prisma.ShoppingItemWhereUniqueInput;
  }) => {
    const idx = this.shoppingItems.findIndex((s) => s.id === where.id);
    if (idx === -1) throw new Error('ShoppingItem not found');
    const [deleted] = this.shoppingItems.splice(idx, 1);
    return deleted;
  };
}
