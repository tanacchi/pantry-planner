import { User } from "../../../../domain/user";
import { Pantry } from "../../../../domain/pantry";

export interface PantryClient {
  getPantryById: (id: Pantry["id"]) => Promise<Pantry>;
  getPantryByUserId: (userId: User["id"]) => Promise<Pantry>;
  createPantry: (userId: User["id"]) => Promise<void>;
}
