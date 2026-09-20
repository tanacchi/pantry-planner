import { Item } from "./item.entity";

describe("Item Entity", () => {
  it("should create item entity", () => {
    const item = new Item(1, "item", "Food", 1, 1, "個", new Date(), new Date(), null);
    expect(item.id).toBe(1);
    expect(item.name).toBe("item");
    expect(item.unit).toBe("個");
  });
});
