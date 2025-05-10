// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { User } from "../domain/user";
import { userClient } from "../lib/client/api/index.server";
import { UserProfile } from "../components/UserProfile";
import { Pantry } from "../domain/pantry";

export const loader: LoaderFunction = async ({
  params,
}): Promise<{ user: User }> => {
  if (!params.userId) {
    throw new Response("User ID is required", { status: 400 });
  }
  const user = await userClient.getUserById(Number(params.userId));
  return { user };
};

export default function Dashboard() {
  const { user } = useLoaderData<{ user: User }>();
  const pantryFetcher = useFetcher<{ pantry: Pantry }>();
  const navigate = useNavigate();
  const pantryId = pantryFetcher.data?.pantry?.id;

  useEffect(() => {
    pantryFetcher.load("/resources/pantry/by-user-id/" + user.id);
  }, [user.id]);

  useEffect(() => {
    console.log("pantryId", pantryId);
    if (pantryId) {
      navigate(`/dashboard/${user.id}/${pantryId}`);
    }
  }, [navigate, pantryId]);

  return (
    <>
      <UserProfile user={user} />
      <Outlet />
    </>
  );
}
