// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { Profile } from "../../hooks/useLiff";
import { useFetcher } from "@remix-run/react";
import { User } from "../../domain/user";


export function LineProfileCard(props: { profile: Profile | null }) {
  const { profile } = props;
  const userFetcher = useFetcher<{ user: User}>();

  useEffect(() => {
    if (profile?.userId) {
      userFetcher.submit({
        id: profile.userId,
      }, {
        method: "post",
        action: "/resources/user/login",
        encType: "application/json",
      });
    }
  }, [profile?.userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={profile.pictureUrl ?? ""}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <span>こんにちは、{profile.displayName}さん！</span>
    </div>
  );
}
