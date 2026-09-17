import { PrismaClient, Category } from '@prisma/client';

// E2E テスト（e2e/tests/fixtures/test-data.ts）が固定 ID で参照するデータを
// 冪等に用意する。サンプルデータ用の seed.ts とは別系統。
const E2E_USER_ID = 27;
const E2E_PANTRY_ID = 9;
const E2E_LINE_UID = 'e2e-test-user-27';

const prisma = new PrismaClient();

// id を明示指定して create すると PostgreSQL の autoincrement シーケンスが
// 追随しないため、以後の（テストが実際に追加する）insert が既存 id と
// 衝突して unique 制約違反になる。各テーブルのシーケンスを
// MAX(id) + 1 に補正する。
async function resyncSequence(table: 'User' | 'Pantry' | 'Item' | 'ShoppingItem') {
  await prisma.$queryRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX(id) FROM "${table}"), 0) + 1, false)`,
  );
}

async function main() {
  // 対象ユーザーのデータを一旦全消しして冪等に作り直す
  await prisma.shoppingItem.deleteMany({ where: { userId: E2E_USER_ID } });
  await prisma.item.deleteMany({ where: { pantry: { userId: E2E_USER_ID } } });

  const user = await prisma.user.upsert({
    where: { id: E2E_USER_ID },
    update: { lineUid: E2E_LINE_UID },
    create: {
      id: E2E_USER_ID,
      lineUid: E2E_LINE_UID,
    },
  });

  const pantry = await prisma.pantry.upsert({
    where: { id: E2E_PANTRY_ID },
    update: { userId: user.id },
    create: {
      id: E2E_PANTRY_ID,
      userId: user.id,
    },
  });

  await prisma.item.createMany({
    data: [
      {
        name: 'りんご',
        quantity: 5,
        unit: '個',
        category: Category.Food,
        pantryId: pantry.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'しょうゆ',
        quantity: 1,
        unit: '本',
        category: Category.Spice,
        pantryId: pantry.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  await prisma.shoppingItem.createMany({
    data: [
      {
        name: '牛乳',
        category: Category.Food,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'コーヒー',
        category: Category.Drink,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'パン',
        category: Category.Food,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  await resyncSequence('User');
  await resyncSequence('Pantry');
  await resyncSequence('Item');
  await resyncSequence('ShoppingItem');

  console.log(`E2E seed 完了: User(${E2E_USER_ID}) / Pantry(${E2E_PANTRY_ID})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
