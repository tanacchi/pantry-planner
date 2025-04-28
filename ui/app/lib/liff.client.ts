import liff from '@line/liff';

export async function initLiff() {
  if (!liff.isInClient() && !liff.isLoggedIn()) {
    await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
    await liff.login();
  }
}

export async function getProfile() {
  if (!liff.isLoggedIn()) {
    throw new Error("User is not logged in");
  }
  return liff.getProfile();
}
