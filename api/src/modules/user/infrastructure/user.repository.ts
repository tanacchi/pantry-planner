import { Injectable } from "@nestjs/common";
import type { PrismaService } from "../../../infrastructure/prisma/prisma.service";
import type { User } from "../domain/entity/user.entity";
import { UserOrmMapper } from "./mapper/user.orm-mapper";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    const result = await this.prisma.user.findUnique({ where: { id } });
    return result ? UserOrmMapper.toDomain(result) : null;
  }

  async findByLineUid(lineUid: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({ where: { lineUid } });
    return result ? UserOrmMapper.toDomain(result) : null;
  }

  async findAll(): Promise<User[]> {
    const results = await this.prisma.user.findMany();
    return results.map((user) => UserOrmMapper.toDomain(user));
  }

  async create(lineUid: string): Promise<User> {
    const result = await this.prisma.user.create({ data: { lineUid } });
    return UserOrmMapper.toDomain(result);
  }

  async update(user: User): Promise<User> {
    const result = await this.prisma.user.update({
      where: { id: user.id },
      data: { ...user, updatedAt: new Date() },
    });
    return UserOrmMapper.toDomain(result);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
