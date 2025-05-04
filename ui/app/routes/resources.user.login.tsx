import { ActionFunction, data } from "@remix-run/server-runtime";
import { pantryClient, userClient } from "../lib/client/api/index.server";

export const action: ActionFunction = async ({ request }) => {
  const id = await request.json().then((data) => data.id);
  if (!id) {
    throw new Response("ID is required", { status: 400 });
  }

  try {
    const user = await userClient.getUserByLineUid(id);
    return data({ user });
  } catch (error) {
    // FIXME: 404 の場合とそれ以外で分ける.
    console.warn("Error fetching user:", error);
    await userClient.createUser(id);
    const newUser = await userClient.getUserByLineUid(id);
    await pantryClient.createPantry(newUser.id);
    return data({ user: await userClient.getUserByLineUid(id) });
  }
};
