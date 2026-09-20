import { Category as PrismaCategory, type Item as PrismaItem } from "@prisma/client";
import { Item } from "../../domain/entity/item.entity";
import { ItemOrmMapper } from "./item.orm-mapper";

describe("ItemOrmMapper", () => {
  const now = new Date();
  const prismaItem: PrismaItem = {
    id: 1,
    name: "しょうゆ",
    category: PrismaCategory.Spice,
    pantryId: 42,
    quantity: 2,
    unit: "本",
    createdAt: now,
    updatedAt: now,
    expiresAt: null,
    deletedAt: null,
  };

  const domainItem = new Item(1, "しょうゆ", "Spice", 42, 2, "本", now, now, null);

  describe("toDomain", () => {
    it("should convert PrismaItem to domain Item correctly", () => {
      const result = ItemOrmMapper.toDomain(prismaItem);
      expect(result).toBeInstanceOf(Item);
      expect(result).toEqual(domainItem);
    });

    it("should handle all category mappings", () => {
      const categories = Object.values(PrismaCategory);
      for (const cat of categories) {
        const prismaItemCat = {
          ...prismaItem,
          category: cat,
        };
        const result = ItemOrmMapper.toDomain(prismaItemCat);
        expect(result.category).toBe(cat);
      }
    });

    it("should handle expiresAt present", () => {
      const expiresAt = new Date();
      const prismaItemWithExpires = { ...prismaItem, expiresAt };
      const result = ItemOrmMapper.toDomain(prismaItemWithExpires);
      expect(result.expiresAt).toEqual(expiresAt);
    });

    it("should handle expiresAt absent", () => {
      const prismaItemNoExpires = { ...prismaItem, expiresAt: null };
      const result = ItemOrmMapper.toDomain(prismaItemNoExpires);
      expect(result.expiresAt).toBeNull();
    });

    it("should throw on unknown category", () => {
      const prismaItemUnknown = {
        ...prismaItem,
        category: "Unknown" as PrismaCategory,
      };
      expect(() => ItemOrmMapper.toDomain(prismaItemUnknown)).toThrow();
    });
  });

  describe("toPrisma", () => {
    it("should convert domain Item to PrismaItem correctly", () => {
      const result = ItemOrmMapper.toPrisma(domainItem);
      expect(result).toEqual(prismaItem);
    });
    it("should handle expiresAt not null", () => {
      const expires = new Date("2025-01-01");
      const domainItemWithExpires = new Item(
        1,
        "しょうゆ",
        "Spice",
        42,
        2,
        "本",
        now,
        now,
        expires,
      );
      const result = ItemOrmMapper.toPrisma(domainItemWithExpires);
      expect(result.expiresAt).toEqual(expires);
    });
  });
});
