import liff from "@line/liff";

export async function initLiff() {
  await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
  console.log("LIFF initialized");
  if (!liff.isInClient() && !liff.isLoggedIn()) {
    liff.login();
  }
}

export async function getProfile() {
  if (!liff.isLoggedIn()) {
    throw new Error("User is not logged in");
  }
  return liff.getProfile();
}
