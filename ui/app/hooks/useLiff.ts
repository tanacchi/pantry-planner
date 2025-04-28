import { useEffect, useState } from "react";
import { initLiff, getProfile } from "../lib/liff.client";

export function useLiff() {
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof getProfile>> | null>(null);

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
