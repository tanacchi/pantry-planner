// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { useLiff } from "../../hooks/useLiff";
import { useFetcher } from "@remix-run/react";
import { User } from "../../domain/user";


export function UserDisplayName() {
  const { profile } = useLiff();
  const userFetcher = useFetcher<{ user: User}>();
  const user = userFetcher.data?.user;

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
      {(() => {
        if (userFetcher.state === "loading") {
          return <span>Loading user data...</span>;
        }
        if (!user) {
          return <span>ユーザーデータがありません</span>;
        }
        return (
          <div className="text-sm text-gray-500">
            <div className="text-sm text-gray-500">
              ユーザーID: {user.id}
              <br />
              LINE UID: {user.lineUid}
              <br />
            </div>
            <div className="text-sm text-gray-500">
              最終ログイン: {user.lastLoginAt.toDateString()}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
