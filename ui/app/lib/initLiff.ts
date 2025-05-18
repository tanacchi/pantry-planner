import { type Liff } from "@line/liff";

export const initLiff = async (
  liffId: string,
  useMock = false
): Promise<Liff> => {
  const liff = (await import("@line/liff")).default;
  if (useMock) {
    console.log("Using mock LIFF");
    const LiffMockPlugin = (await import("@line/liff-mock")).default;
    liff.use(new LiffMockPlugin());
    await liff.init({
      liffId: liffId,
      mock: true,
    });
    const userId = import.meta.env.VITE_DUMMY_USER_ID;
    liff.$mock.set((p) => ({
      ...p,
      getProfile: { displayName: "ダミー田中", userId: userId ?? "123456789" },
    }));
    return liff;
  } else {
    const liff = (await import("@line/liff")).default;
    await liff.init({ liffId });
    return liff;
  }
};
