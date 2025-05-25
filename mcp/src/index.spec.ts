import { describe, it, expect, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { server } from "./index.js";

// Arrange: PantryApiClientのモック
const mockItems = [
  { name: "りんご", category: "Food", quantity: 2, unit: "個" },
  { name: "牛乳", category: "Drink", quantity: 1, unit: "本" },
];
vi.mock("./client/api.client", () => {
  return {
    PantryApiClient: vi.fn().mockImplementation(() => ({
      getItemsByPantryId: vi.fn().mockResolvedValue(mockItems),
      addItem: vi.fn().mockResolvedValue({ id: 1, name: "りんご" }),
    })),
  };
});

describe("getCurrentPantryItems", () => {
  const cases = [
    { limit: 1, expected: [mockItems[0].name] },
    { limit: 2, expected: [mockItems[0].name, mockItems[1].name] },
  ];
  it.each(cases)(
    "limit=%s件分のパントリーアイテム情報をテキストで返す",
    async ({ limit, expected }) => {
      // Arrange
      const client = new Client({ name: "test client", version: "0.1.0" });
      const [clientTransport, serverTransport] =
        InMemoryTransport.createLinkedPair();
      await Promise.all([
        client.connect(clientTransport),
        server.connect(serverTransport),
      ]);
      // Act
      const result = await client.callTool({
        name: "getCurrentPantryItems",
        arguments: { limit },
      });
      // Assert
      expect(result).toEqual({
        content: [
          {
            type: "text",
            text: expect.stringContaining(expected.join("")),
          },
        ],
      });
      // 型安全にcontentを検証
      const content = (result as any).content as Array<{
        type: string;
        text: string;
      }>;
      expected.forEach((item) => {
        expect(content[0].text).toContain(item);
      });
    }
  );

  it("limitが不正な場合はエラーとなる", async () => {
    // Arrange
    const client = new Client({ name: "test client", version: "0.1.0" });
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();
    await Promise.all([
      client.connect(clientTransport),
      server.connect(serverTransport),
    ]);
    // Act & Assert
    await expect(
      client.callTool({
        name: "getCurrentPantryItems",
        arguments: { limit: 0 },
      })
    ).rejects.toThrow();
  });

  it("limit未指定の場合はエラーとなる", async () => {
    const client = new Client({ name: "test client", version: "0.1.0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([
      client.connect(clientTransport),
      server.connect(serverTransport),
    ]);
    await expect(
      client.callTool({ name: "getCurrentPantryItems", arguments: {} })
    ).rejects.toThrow();
  });

  it("limitが負数の場合はエラーとなる", async () => {
    const client = new Client({ name: "test client", version: "0.1.0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([
      client.connect(clientTransport),
      server.connect(serverTransport),
    ]);
    await expect(
      client.callTool({ name: "getCurrentPantryItems", arguments: { limit: -1 } })
    ).rejects.toThrow();
  });

  it("limitが数値以外の場合はエラーとなる", async () => {
    const client = new Client({ name: "test client", version: "0.1.0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([
      client.connect(clientTransport),
      server.connect(serverTransport),
    ]);
    await expect(
      client.callTool({ name: "getCurrentPantryItems", arguments: { limit: "abc" } as any })
    ).rejects.toThrow();
  });

  it("サーバ未接続時はエラーとなる", async () => {
    const client = new Client({ name: "test client", version: "0.1.0" });
    // サーバ接続しない
    await client.connect(InMemoryTransport.createLinkedPair()[0]);
    await expect(
      client.callTool({ name: "getCurrentPantryItems", arguments: { limit: 1 } })
    ).rejects.toThrow();
  });

  it("サーバ側で例外が発生した場合はエラーとなる", async () => {
    // getItemsByPantryIdが例外を投げるようにモック
    const errorMsg = "API error";
    (require("./client/api.client").PantryApiClient.prototype.getItemsByPantryId as any).mockRejectedValueOnce(new Error(errorMsg));
    const client = new Client({ name: "test client", version: "0.1.0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([
      client.connect(clientTransport),
      server.connect(serverTransport),
    ]);
    await expect(
      client.callTool({ name: "getCurrentPantryItems", arguments: { limit: 1 } })
    ).rejects.toThrow(errorMsg);
  });
});
