import { db } from "@/drizzle/db";
import { Moderator, User } from "@/drizzle/schema";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import { type Browser } from "@playwright/test";

const USER_ID = "regularUser";
const ETHEREUM_ADDRESS = "the-ethereum-address";

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

  await db.delete(User);
  await db.delete(Moderator);

  await db
    .insert(User)
    .values({
      id: USER_ID,
      name: "Regular User",
      ethereumAddress: ETHEREUM_ADDRESS,
    })
    .onConflictDoUpdate({
      target: User.id,
      set: {
        name: "Regular User",
      },
    });

  await db.insert(Moderator).values({ ethereumAddress: ETHEREUM_ADDRESS });

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
