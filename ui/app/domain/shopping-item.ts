import { ItemCategory, All_CATEGORIES } from './item';

export class ShoppingItem {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly category: ItemCategory,
    public readonly userId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null = null,
  ) {}
}

export interface CreateShoppingItemRequest {
  name: string;
  category: ItemCategory;
  userId: number;
}

export interface UpdateShoppingItemRequest {
  id: number;
  name: string;
  category: ItemCategory;
  userId: number;
}

export { All_CATEGORIES, ItemCategory };