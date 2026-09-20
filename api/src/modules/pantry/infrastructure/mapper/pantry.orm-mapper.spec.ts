import { PantryOrmMapper } from "./pantry.orm-mapper";

describe("PantryOrmMapper", () => {
  it("should map orm to entity", () => {
    const orm = {
      id: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const entity = PantryOrmMapper.toDomain(orm);
    expect(entity).toMatchObject({ id: 1, userId: 1 });
  });
});
