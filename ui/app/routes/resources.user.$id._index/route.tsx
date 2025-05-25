import { data, LoaderFunction } from "@remix-run/server-runtime";
import { userClient } from "../../lib/client/api/index.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Error("ID is required");
  }

  const user = await userClient.getUserById(Number(id));
  return data({ user });
};
