"use client";

import { Loader2Icon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "./button";

export function AccountButton() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <Button className="w-24" disabled>
        <Loader2Icon className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        className="w-24"
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    );
  }

  return (
    <Button className="w-24" onClick={() => signIn("worldcoin")}>
      Sign in
    </Button>
  );
}
