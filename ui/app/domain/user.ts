import { Pantry } from "./pantry";

export class UserSummary {
  constructor(
    public readonly id: number,
    public readonly lineUid: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly lastLoginAt: Date,
  ) {}
}

export class User extends UserSummary {
  constructor(
    public readonly id: number,
    public readonly lineUid: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly lastLoginAt: Date,
    public readonly pantry: Pantry,
  ) {
    super(id, lineUid, createdAt, updatedAt, lastLoginAt);
  }
}
