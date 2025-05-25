import { ActionFunction, data } from "@remix-run/server-runtime";
import { userClient } from "../../lib/client/api/index.server";

export const action: ActionFunction = async ({ request }) => {
  // FIXME: ２回呼ばれてる？
  const id = await request.json().then((data) => data.id);
  if (!id) {
    throw new Response("lineUid is required", { status: 400 });
  }

  try {
    const user = await userClient.getUserByLineUid(id);
    return data({ user });
  } catch (error) {
    // FIXME: 404 の場合とそれ以外で分ける.
    const newUser = await userClient.createUser(id);
    return data({ user: newUser });
  }
};
