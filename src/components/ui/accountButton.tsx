import { getSession } from "@auth0/nextjs-auth0";

import { Button } from "./button";

export async function AccountButton() {
  const session = await getSession();

  if (session) {
    return (
      <Button className="w-24" asChild>
        <a href="/api/auth/logout">Sign out</a>
      </Button>
    );
  }

  return (
    <Button className="w-24" asChild>
      <a href="/api/auth/login">Sign in</a>
    </Button>
  );
}
