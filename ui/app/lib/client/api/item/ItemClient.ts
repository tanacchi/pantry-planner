export interface ItemClient {
  getItemById: (id: string) => Promise<Item>;
  getItemsByPantryId: (pantryId: string) => Promise<Item[]>;
}
