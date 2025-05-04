import { Item } from "./item";

export class PantrySummary {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export class Pantry extends PantrySummary {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly items: Item[],
  ) {
    super(id, userId, createdAt, updatedAt);
  }
}
