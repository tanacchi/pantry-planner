import { ItemApi } from "../generated";
import { IItemClient } from "./ItemClient";

export class ItemClientImpl implements IItemClient {
  constructor(private readonly api: ItemApi) {}

  async getItemById(id: string): Promise<Item> {
    return this.api.getItemById(id);
  }

  async getItemsByPantryId(pantryId: string): Promise<Item[]> {
    return this.api.getItemsByPantryId(pantryId);
  }
}
