// api/prisma/seed-e2e.ts が用意する固定データと対応する。
// pnpm -C api run db:seed:e2e を実行してから使うこと。
export const TEST_USER_ID = 27;
export const TEST_PANTRY_ID = 9;

// 存在しない ID を使うテスト用。実データと衝突しないよう大きな値にする。
export const UNKNOWN_USER_ID = 99999;
export const UNKNOWN_PANTRY_ID = 99999;

export const TEST_DATA = {
  user: {
    id: TEST_USER_ID,
    lineUid: "e2e-test-user-27",
  },
  pantry: {
    id: TEST_PANTRY_ID,
    userId: TEST_USER_ID,
  },
  shoppingItems: [
    {
      name: "テスト商品1",
      category: "Food" as const,
    },
    {
      name: "テスト商品2",
      category: "Drink" as const,
    },
  ],
  pantryItems: [
    {
      name: "テストアイテム1",
      category: "Food" as const,
      quantity: 1,
      unit: "個",
    },
    {
      name: "テストアイテム2",
      category: "Drink" as const,
      quantity: 2,
      unit: "本",
    },
  ],
} as const;
