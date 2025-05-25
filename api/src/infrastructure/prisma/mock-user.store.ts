/* eslint-disable @typescript-eslint/require-await */
import { User, Prisma } from '@prisma/client';
import { findById } from './mock-util';

export class MockUserStore {
  private users: User[] = [];
  private idSeq = 1;

  findUnique = async ({ where }: { where: Prisma.UserWhereUniqueInput }) => {
    if (where.id !== undefined)
      return this.users.find((u) => u.id === where.id) ?? null;
    if (where.lineUid !== undefined)
      return this.users.find((u) => u.lineUid === where.lineUid) ?? null;
    return null;
  };
  findMany = async () => [...this.users];
  create = async ({ data }: { data: Prisma.UserCreateInput }) => {
    const user: User = {
      id: this.idSeq++,
      lineUid: data.lineUid,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: new Date(),
    };
    this.users.push(user);
    return user;
  };
  update = async ({
    where,
    data,
  }: {
    where: Prisma.UserWhereUniqueInput;
    data: Partial<User>;
  }) => {
    const user = findById(this.users, where.id!);
    if (!user) throw new Error('User not found');
    Object.assign(user, data, { updatedAt: new Date() });
    return user;
  };
  delete = async ({ where }: { where: Prisma.UserWhereUniqueInput }) => {
    const idx = this.users.findIndex((u) => u.id === where.id);
    if (idx === -1) throw new Error('User not found');
    const [deleted] = this.users.splice(idx, 1);
    return deleted;
  };
}
