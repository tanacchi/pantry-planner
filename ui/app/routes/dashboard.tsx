// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { LoaderFunction } from "@remix-run/server-runtime";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import { useLiff } from "../hooks/useLiff";
import { User } from "../domain/user";
import { LineProfileCard } from "../components/liff/LineProfile";

export const loader: LoaderFunction = async (): Promise<{ title: string }> => {
  return { title: "dashboard" };
};

export default function Dashboard() {
  const { title } = useLoaderData<{ title: string }>();
  const userFetcher = useFetcher<{ user: User }>();
  const { id: userId } = userFetcher.data?.user || {};
  const { profile } = useLiff();
  const navigate = useNavigate();
  useEffect(() => {
    if (!profile) {
      return;
    }
    userFetcher.submit(
      {
        id: profile.userId,
      },
      {
        method: "post",
        action: "/resources/user/login",
        encType: "application/json",
      }
    );
  }, [profile?.userId]);

  const matches = useMatches();
  const isAtDeeperRoute = matches.some(
    (m) =>
      m.id === "routes/dashboard.$userId.$pantryId" ||
      m.id === "routes/dashboard.$userId"
  );
  useEffect(() => {
    if (userId && !isAtDeeperRoute) {
      navigate(`/dashboard/${userId}`);
    }
  }, [navigate, userId, isAtDeeperRoute]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <LineProfileCard profile={profile} />
      <Outlet />
    </div>
  );
}
