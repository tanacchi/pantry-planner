import { type ActionFunction, data } from "@remix-run/node";
import { login } from "../../db";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { lineUid } = await request.json();
    if (!lineUid) {
      return data({ error: "LINE UID is required" }, { status: 400 });
    }
    const user = await login(lineUid).then((data) => data.user);
    return data(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return data({ error: "Invalid request" }, { status: 400 });
  }
}

export const loader = () => {
  return new Response("Method Not Allowed", { status: 405 });
};
