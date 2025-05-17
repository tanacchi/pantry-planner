import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { PantryApiClient } from "./client/api.client";
import { formatItem } from "./format/item.formatter";

const pantryApiClient = new PantryApiClient();
const USER_ID = process.env.USER_ID;
const PANTRY_ID = process.env.PANTRY_ID;
if (!USER_ID || !PANTRY_ID) {
  throw new Error(
    "USER_ID and PANTRY_ID must be set in the environment variables."
  );
}

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
  "getPantryItems",
  "Retrieve all item information in the pantry or refrigerator.",
  { limit: z.number().min(1).describe("Number of items to get.") },
  async ({ limit }) => {
    const items = (await pantryApiClient.getItemsByPantryId(Number(PANTRY_ID)))
      .slice(0, limit)
      .map(formatItem);

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

server.tool(
  "addItemToPantry",
  "Add an item to the pantry or refrigerator.",
  {
    name: z.string().describe("Name of the item to add in Japanese."),
    category: z
      .enum(["Food", "Drink", "Snack", "Spice", "Other"])
      .describe("Category of the item."),
    quantity: z.number().min(1).describe("Quantity of the item."),
    unit: z.string().describe("Unit of the item in Japanese. e.g. 個, g, ml"),
  },
  async ({ name, category, quantity, unit }) => {
    const item = {
      name,
      category,
      quantity,
      unit,
    };
    const result = await pantryApiClient.addItem({
      ...item,
      pantryId: Number(PANTRY_ID),
    });
    return {
      content: [
        {
          type: "text",
          text: `Added item: ${result.name} (${result.quantity}${result.unit})`,
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
