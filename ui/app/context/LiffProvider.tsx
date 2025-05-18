// app/context/LiffContext.tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Liff } from '@line/liff';
import { createLiff } from '../lib/createLiff';

const LiffContext = createContext<Liff | null>(null);

export const useLiff = (): Liff | null => {
  const ctx = useContext(LiffContext);
  console.log('useLiff', ctx);
  return ctx;
};

export const LiffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [liff, setLiff] = useState<Liff | null>(null);
  const liffId = import.meta.env.VITE_LIFF_ID;
  const useMock = import.meta.env.VITE_USE_LIFF_MOCK === 'true';
  console.log('LiffProvider', { liffId, useMock });
  const initLiff = useCallback(async () => {
    await createLiff(liffId).then(setLiff);
  }, [liffId]);

  // 開発環境では useEffect は2回実行されるため、初期化を2回行わないようにする
  useEffect(() => {
    initLiff();
  }, [initLiff]);

  return (
    <LiffContext.Provider value={liff}>
      {children}
    </LiffContext.Provider>
  );
};
