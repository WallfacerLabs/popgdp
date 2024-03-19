"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { ProgressIcon } from "@/components/icons/progressIcon";

import { Button } from "./button";

export function AccountButton() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <Button className="w-24" disabled>
        <ProgressIcon className="animate-spin" />
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
    <Button className="w-24" onClick={() => signIn("github")}>
      Sign in
    </Button>
  );
}
