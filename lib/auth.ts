import { db } from "@/drizzle/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: {
        params: { scope: "openid", url: "https://id.worldcoin.org/authorize" },
      },
      issuer: "https://id.worldcoin.org",
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          credentialType:
            profile["https://id.worldcoin.org/beta"].credential_type,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
