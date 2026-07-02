/* ⚠️ TODO: confirm before launch — app.wazen.com does NOT resolve yet
   (verified July 2026). This is a placeholder; the real app URL is set at
   launch. Every conversion CTA on the page reads from this file, so the
   swap is a one-line change here. Launch checklist: update both URLs,
   click-test signup + login return 200, and update the BrowserFrame
   address-bar text in Hero/Features to match the real domain. */
export const APP_URLS = {
  signup: "https://app.wazen.com/signup",
  login: "https://app.wazen.com/login",
} as const;
