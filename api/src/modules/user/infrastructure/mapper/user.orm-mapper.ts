import type { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entity/user.entity";

export class UserOrmMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.lineUid,
      new Date(prismaUser.createdAt),
      new Date(prismaUser.updatedAt),
      new Date(prismaUser.lastLoginAt),
    );
  }

  // Prisma に渡す形式が必要なら追加
  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      lineUid: user.lineUid,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
    };
  }
}
