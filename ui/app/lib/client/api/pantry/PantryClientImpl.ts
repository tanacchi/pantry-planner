import { Pantry } from "../../../../domain/pantry";
import { PantryApi, PantryDetailResponseDto } from "../generated";
import { responseToItem } from "../item/ItemClientImpl";
import { PantryClient } from "./PantryClient";

export class PantryClientImpl implements PantryClient {
  constructor(private readonly api: PantryApi) {}

  async getPantryById(id: number): Promise<Pantry> {
    try {
      const res = await this.api.pantryControllerGetPantryDetail({ id });
      return responseToPantry(res);
    } catch (err) {
      console.error("Error fetching pantry by ID:", err);
      throw err;
    }
  }

  async getPantryByUserId(userId: number): Promise<Pantry> {
    try {
      const res = await this.api.pantryControllerGetPantryDetailsByUser({
        userId,
      });
      console.log("res", res);
      return responseToPantry(res[0]);
    } catch (err) {
      console.error("Error fetching pantries by user ID:", err);
      throw err;
    }
  }

  async createPantry(userId: number): Promise<void> {
    await this.api
      .pantryControllerCreatePantry({ createPantryRequestDto: { userId } })
      .catch((err) => {
        console.error("Error creating pantry:", err);
        throw err;
      });
  }
}

export const responseToPantry = (res: PantryDetailResponseDto): Pantry => {
  return new Pantry(
    res.id,
    res.userId,
    new Date(res.createdAt),
    new Date(res.updatedAt),
    res.items.map((item) => responseToItem(item))
  );
};
