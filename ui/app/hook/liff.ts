import { useEffect, useState } from "react";
import { useLiff } from "~/context/LiffProvider";
import type { Liff } from "@line/liff";

type LineProfile = Awaited<ReturnType<Liff["getProfile"]>>;

export const useLineProfile = (): LineProfile | null => {
  const liff = useLiff();
  const [profile, setProfile] = useState<LineProfile | null>(null);

  useEffect(() => {
    if (!liff) return;

    liff
      .getProfile()
      .then((profile) => {
        setProfile(profile);
      })
      .catch((error) => {
        console.error('Error getting profile:', error);
      });
  }, [liff]);

  return profile;
}
