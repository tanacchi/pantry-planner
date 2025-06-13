import { ShoppingItem, CreateShoppingItemRequest, UpdateShoppingItemRequest } from "../../../../domain/shopping-item";

export interface ShoppingItemClient {
  getItemsByUserId: (userId: number) => Promise<ShoppingItem[]>;
  getItemById: (id: number) => Promise<ShoppingItem | null>;
  createItem: (params: CreateShoppingItemRequest) => Promise<ShoppingItem>;
  updateItem: (id: number, params: UpdateShoppingItemRequest) => Promise<ShoppingItem | null>;
  deleteItem: (id: number) => Promise<void>;
}