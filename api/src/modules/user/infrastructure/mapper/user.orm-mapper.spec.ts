import type { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entity/user.entity";
import { UserOrmMapper } from "./user.orm-mapper";

describe("UserOrmMapper", () => {
  const now = new Date();
  const prismaUser: PrismaUser = {
    id: 1,
    lineUid: "line-uid-1",
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  };

  const domainUser = new User(1, "line-uid-1", now, now, now);

  describe("toDomain", () => {
    it("should convert PrismaUser to domain User correctly", () => {
      const result = UserOrmMapper.toDomain(prismaUser);
      expect(result).toBeInstanceOf(User);
      expect(result).toEqual(domainUser);
    });
  });

  describe("toPrisma", () => {
    it("should convert domain User to PrismaUser correctly", () => {
      const result = UserOrmMapper.toPrisma(domainUser);
      expect(result).toEqual(prismaUser);
    });
  });
});
