import { data, LoaderFunction } from "@remix-run/server-runtime";
import { pantryClient } from "../../lib/client/api/index.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Error("ID is required");
  }

  const pantry = await pantryClient.getPantryByUserId(Number(id));
  return data({ pantry });
};
