import { PantryApi } from "../generated";
import { PantryClient } from "./PantryClient";

export class PantryClientImpl implements PantryClient {
  constructor(private readonly api: PantryApi) {}

  getPantryById(id: string): Promise<Pantry> {
    return this.api.getPantryById(id);
  }

  getPantriesByUserId(userId: string): Promise<Pantry[]> {
    return this.api.getPantriesByUserId(userId);
  }

  createPantry(pantry: Pantry): Promise<Pantry> {
    return this.api.createPantry(pantry);
  }
}
