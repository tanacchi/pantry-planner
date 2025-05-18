// app/context/LiffContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Liff } from "@line/liff";
import { initLiff} from "../lib/initLiff";

const LiffContext = createContext<Liff | null>(null);

export const useLiff = (): Liff | null => {
  const ctx = useContext(LiffContext);
  return ctx;
};

export const LiffProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [liff, setLiff] = useState<Liff | null>(null);
  const liffId = import.meta.env.VITE_LIFF_ID;
  const useMock = import.meta.env.VITE_USE_LIFF_MOCK === "true";
  const init = useCallback(async () => {
    await initLiff(liffId, useMock).then((liff) => {
      setLiff(liff);
      if (!liff.isInClient() && !liff.isLoggedIn()) {
        liff.login();
      }
    });
  }, [liffId]);

  // 開発環境では useEffect は2回実行されるため、初期化を2回行わないようにする
  useEffect(() => {
    init();
  }, [init]);

  return <LiffContext.Provider value={liff}>{children}</LiffContext.Provider>;
};
