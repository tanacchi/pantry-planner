export enum Category {
  Food = 'Food',
  Drink = 'Drink',
  Snack = 'Snack',
  Spice = 'Spice',
  Other = 'Other',
}

export class Item {
  id: number;

  name: string;

  category: Category;

  pantryId: number;

  quantity: number;

  unit: string;

  createdAt: Date;

  updatedAt: Date;
}
