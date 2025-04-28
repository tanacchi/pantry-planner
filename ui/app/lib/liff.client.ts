import liff from "@line/liff";

export async function initLiff() {
  console.log("Initializing LIFF");
  console.log("LIFF ID:", import.meta.env.VITE_LIFF_ID);
  await liff.ready.then(async () => {
    console.log("LIFF ready");
    if (!liff.isInClient() && !liff.isLoggedIn()) {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
      liff.login();
    }
  });
}

export async function getProfile() {
  if (!liff.isLoggedIn()) {
    throw new Error("User is not logged in");
  }
  return liff.getProfile();
}
