export const TEST_USER_ID = 27;
export const TEST_PANTRY_ID = 9;

export const TEST_DATA = {
  user: {
    id: TEST_USER_ID,
    lineUid: "Uce47f71b572222a66a94b1fde81446df",
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
