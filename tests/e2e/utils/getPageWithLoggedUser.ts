import { type Browser } from "@playwright/test";

export async function getPageWithLoggedUser(browser: Browser) {
  const browserContext = await browser.newContext({
    storageState: "./tests/e2e/.auth/member.json",
  });
  return browserContext.newPage();
}
