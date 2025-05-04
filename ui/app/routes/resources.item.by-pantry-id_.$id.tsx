import { data, LoaderFunction } from "@remix-run/server-runtime";
import { itemClient } from "../lib/client/api/index.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Error("ID is required");
  }

  const items = await itemClient.getItemsByPantryId(Number(id));
  return data({ items});
}
