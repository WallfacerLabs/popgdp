"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { urls } from "@/constants/urls";

import { cn } from "@/lib/cn";

import { Button } from "./button";

export function ModeratorNavigaton() {
  return (
    <nav className="flex gap-2">
      <ActiveLink href={urls.moderator.applications}>Submissions</ActiveLink>
      <ActiveLink href={urls.moderator.users}>Users</ActiveLink>
      <ActiveLink href={urls.moderator.reviewers}>Reviewers</ActiveLink>
    </nav>
  );
}

interface ActiveButtonProps {
  children: ReactNode;
  href: string;
}

function ActiveLink({ children, href }: ActiveButtonProps) {
  const pathname = usePathname();

  return (
    <Button
      variant="outline"
      className={cn({ "border-primary": pathname === href })}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
