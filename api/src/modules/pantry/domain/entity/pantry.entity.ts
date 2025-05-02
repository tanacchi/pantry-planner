export class Pantry {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
