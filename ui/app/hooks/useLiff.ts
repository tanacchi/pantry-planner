// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { initLiff, getProfile } from "../lib/client/liff.client";

export type Profile = Awaited<ReturnType<typeof getProfile>>;

export function useLiff() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        await initLiff();
        const userProfile = await getProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("LIFF initialization error:", error);
      }
    }
    initialize();
  }, []);

  return { profile };
}
