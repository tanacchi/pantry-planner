import { Item } from "../../../../domain/item";
import { ItemApi, ItemResponseDto } from "../generated";
import { ItemClient } from "./ItemClient";

export class ItemClientImpl implements ItemClient {
  constructor(private readonly api: ItemApi) {}

  async getItemById(id: number): Promise<Item> {
    return this.api.itemControllerGetItem({ id })
      .then((res) => responseToItem(res))
      .catch((err) => {
        console.error("Error fetching item by ID:", err);
        throw err;
      });
  }

  async getItemsByPantryId(pantryId: number): Promise<Item[]> {
    return this.api.itemControllerGetItemsByPantry({ pantryId })
      .then((res) => res.map((item) => responseToItem(item)))
      .catch((err) => {
        console.error("Error fetching items by pantry ID:", err);
        throw err;
      });
  }
}

export const responseToItem = (res: ItemResponseDto): Item => {
  return new Item(
    res.id,
    res.name,
    res.category,
    res.pantryId,
    res.quantity,
    res.unit,
    res.createdAt,
    res.updatedAt,
    null, // FIXME: expiresAt is not in the response
  );
}
