export type ItemName = "Milk" | "Eggs" | "Bread" | "Rice" | "OliveOil" | "Salt" | "Sugar" | "Pepper";
export type Category = "food" | "drink" | "snack" | "spice" | "other";

export interface Item {
  id: string;
  name: ItemName;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface Pantry {
  id: string;
  userId: string;
  items: Item[];
  capacity: number;
}
