export const All_CATEGORIES = [
  'Food',
  'Drink',
  'Snack',
  'Spice',
  'Other',
] as const;

export type ItemCategory = (typeof All_CATEGORIES)[number];

export class Item {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly category: ItemCategory,
    public readonly pantryId: number,
    public readonly quantity: number,
    public readonly unit: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly expiresAt: Date | null = null,
  ) {}
}
