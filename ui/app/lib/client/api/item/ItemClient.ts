import { Pantry } from "../../../../domain/pantry";
import { Item } from "../../../../domain/item";

export interface ItemClient {
  getItemById: (id: Item["id"]) => Promise<Item>;
  getItemsByPantryId: (pantryId: Pantry["id"]) => Promise<Item[]>;
  addItem: (params: {
    name: Item["name"];
    category: Item["category"];
    pantryId: Item["pantryId"];
    quantity: Item["quantity"];
    unit: Item["unit"];
    expiresAt: Item["expiresAt"];
  }) => Promise<Item>;
  deleteItem: (id: Item["id"]) => Promise<void>;
}
