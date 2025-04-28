// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { useLiff } from "../../hooks/useLiff";
import { useFetcher } from "@remix-run/react";

type User = {
  id: number;
  lineUid: string;
  lastLoginAt: Date;
};

export function UserDisplayName() {
  const { profile } = useLiff();
  const fetcher = useFetcher<User>();

  useEffect(() => {
    if (profile?.userId) {
      fetcher.load(`/resources/user?lineUid=${profile.userId}`);
    }
  }, [profile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const user = fetcher.data;

  return (
    <div className="flex items-center space-x-4">
      <img
        src={profile.pictureUrl ?? ""}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <span>こんにちは、{profile.displayName}さん！</span>
      {(() => {
        if (fetcher.state === "loading" || user == null) {
          return <span>Loading user data...</span>;
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
              最終ログイン: {new Date(user.lastLoginAt).toLocaleString()}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
