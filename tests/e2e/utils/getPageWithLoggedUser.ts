import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import { type Browser } from "@playwright/test";

const USER_ID = "regularUser";

export async function getPageWithLoggedUser(browser: Browser) {
  const session = await generateSessionCookie(
    {
      user: {
        sid: USER_ID,
        credentialType: "orb",
      },
    },
    { secret: process.env.AUTH0_SECRET! },
  );

  await db
    .insert(User)
    .values({
      id: USER_ID,
      name: "Regular User",
    })
    .onConflictDoUpdate({
      target: User.id,
      set: {
        name: "Regular User",
      },
    });

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
