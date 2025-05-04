import { Pantry } from "../../../../domain/pantry";
import { Item } from "../../../../domain/item";

export interface ItemClient {
  getItemById: (id: Item["id"]) => Promise<Item>;
  getItemsByPantryId: (pantryId: Pantry["id"]) => Promise<Item[]>;
}
