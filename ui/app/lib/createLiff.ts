import { type Liff } from '@line/liff';

export const createLiff = async (liffId: string, useMock = false): Promise<Liff> => {
  const liff = (await import('@line/liff')).default;
  if (useMock) {
    console.log('Using mock LIFF');
    const LiffMockPlugin = (await import('@line/liff-mock')).default;
    liff.use(new LiffMockPlugin());
    await liff.init({
      liffId: liffId,
      mock: true
    });
    console.log('LIFF initialized with mock');
    return liff;
  } else {
    const liff = (await import('@line/liff')).default;
    await liff.init({ liffId });
    return liff;
  }
};
