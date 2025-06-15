export class User {
  constructor(
    public readonly id: number,
    public readonly lineUid: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly lastLoginAt: Date
  ) {}
}
