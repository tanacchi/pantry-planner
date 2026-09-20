import { Pantry } from "./pantry.entity";

describe("Pantry Entity", () => {
  it("should create pantry entity", () => {
    const pantry = new Pantry(1, 1, new Date(), new Date());
    expect(pantry.id).toBe(1);
    expect(pantry.userId).toBe(1);
  });
});
