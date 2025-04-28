// app/routes/resources.user.tsx
import { data } from "@remix-run/node";
import { login } from "../db";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const lineUid = url.searchParams.get("lineUid");

  if (!lineUid) {
    throw new Response("Missing lineUid", { status: 400 });
  }

  const user = await login(lineUid).then(res => res.user);
  return data(user);
};
