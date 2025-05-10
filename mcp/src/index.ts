import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { PantryApiClient } from "./client/api.client";
import { formatItem } from "./format/item.formatter";

const pantryApiClient = new PantryApiClient();

// Create server instance
export const server = new McpServer({
  name: "pantry_planner",
  version: "0.0.1",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "getDiceRoll", // ツールの名前
  "Roll a dice with a specified number of sides and return the result.",
  // ツールの引数を定義するスキーマ
  { sides: z.number().min(1).describe("Number of sides on the die") },
  // ツールが呼び出されたときに実行される関数
  async ({ sides }) => {
    // 1から指定された面数までのランダムな整数を生成
    const roll = Math.floor(Math.random() * sides) + 1;

    return {
      content: [
        {
          type: "text",
          text: roll.toString(),
        },
      ],
    };
  }
);

server.tool(
  "getAllPantryItems",
  "Retrieve all item information in the pantry or refrigerator.",
  // ツールの引数を定義するスキーマ
  { limit: z.number().min(1).describe("Number of items to get.") },
  // ツールが呼び出されたときに実行される関数
  async ({ limit }) => {
    // 1から指定された面数までのランダムな整数を生成

    const items = (await pantryApiClient.getAllItems()).slice(0, limit).map(formatItem);

    return {
      content: [
        {
          type: "text",
          text: items.join("\n"),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // 標準出力をするとサーバーのレスポンスとして解釈されてしまうので、標準エラー出力に出力する
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
