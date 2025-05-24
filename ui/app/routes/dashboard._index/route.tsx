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
import { User } from "../../domain/user";
import { LineProfileCard } from "../../components/liff/LineProfile";
import { useLiff } from "../../context/LiffProvider";
import { useLineProfile } from "../../hook/liff";

export const loader: LoaderFunction = async (): Promise<{ title: string }> => {
  return { title: "dashboard" };
};

export default function Dashboard() {
  const liff = useLiff();
  const { title } = useLoaderData<{ title: string }>();
  const userFetcher = useFetcher<{ user: User }>();
  const profile = useLineProfile();
  useEffect(() => {
    if (!profile || !profile.userId) {
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

  const navigate = useNavigate();
  useEffect(() => {
    if (
      userFetcher.state === "idle" &&
      userFetcher.data?.user?.id &&
      !isAtDeeperRoute
    ) {
      navigate(`/dashboard/${userFetcher.data?.user.id}`);
    }
  }, [navigate, userFetcher.state, userFetcher.data, isAtDeeperRoute]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <LineProfileCard profile={profile} />
      <Outlet />
    </div>
  );
}
