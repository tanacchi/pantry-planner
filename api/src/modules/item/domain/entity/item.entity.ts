export enum Category {
  Food = 'Food',
  Drink = 'Drink',
  Snack = 'Snack',
  Spice = 'Spice',
  Other = 'Other',
}

export class Item {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly category: Category,
    public readonly pantryId: number,
    public readonly quantity: number,
    public readonly unit: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
