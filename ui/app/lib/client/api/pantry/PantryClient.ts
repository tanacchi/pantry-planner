export interface PantryClient {
  getPantryById: (id: string) => Promise<Pantry>;
  getPantriesByUserId: (userId: string) => Promise<Pantry[]>;
  createPantry: (pantry: Pantry) => Promise<Pantry>;
}
