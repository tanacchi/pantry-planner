import { ShoppingItem } from "./shopping-item.entity";

describe("ShoppingItem Entity", () => {
  it("should create shopping item entity", () => {
    const item = new ShoppingItem(1, "item", "Food", 1, new Date(), new Date(), null);
    expect(item.id).toBe(1);
    expect(item.name).toBe("item");
  });
});
