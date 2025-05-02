/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { User } from '../domain/entity/user.entity';
import { UserOrmMapper } from './mapper/user.orm-mapper';

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

  async update(id: number, lineUid: string): Promise<User> {
    const result = await this.prisma.user.update({
      where: { id },
      data: { lineUid },
    });
    return UserOrmMapper.toDomain(result);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
