import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // User作成
  const user = await prisma.user.upsert({
    where: { lineUid: "sample-line-uid" },
    update: {},
    create: {
      lineUid: "sample-line-uid",
    },
  });

  // Pantry作成
  const pantry = await prisma.pantry.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
    },
  });

  // Item作成
  await prisma.item.createMany({
    data: [
      {
        name: "りんご",
        quantity: 5,
        unit: "個",
        category: Category.Food,
        pantryId: pantry.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "しょうゆ",
        quantity: 1,
        unit: "本",
        category: Category.Spice,
        pantryId: pantry.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  // ShoppingItem作成
  await prisma.shoppingItem.createMany({
    data: [
      {
        name: "牛乳",
        category: Category.Food,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "コーヒー",
        category: Category.Drink,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "パン",
        category: Category.Food,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  console.log("User, Pantry, Item, ShoppingItem seed 完了");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
