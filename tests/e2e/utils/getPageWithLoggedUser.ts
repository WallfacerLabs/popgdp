import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import { type Browser } from "@playwright/test";

export async function getPageWithLoggedUser(browser: Browser) {
  const session = await generateSessionCookie(
    {},
    { secret: process.env.AUTH0_SECRET! },
  );

  const browserContext = await browser.newContext({
    storageState: {
      origins: [],
      cookies: [
        {
          name: "appSession",
          value: session,
          domain: "127.0.0.1",
          path: "/",
          expires: -1,
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
        },
      ],
    },
  });

  return browserContext.newPage();
}
