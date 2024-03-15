import Link from "next/link";

import { ArrowIcon } from "@/components/icons/arrowIcon";

import { Button } from "./button";

export function BackButton({ href }: { href: string }) {
  return (
    <Button size="icon" variant="outline" className="text-sm" asChild>
      <Link href={href}>
        <ArrowIcon direction="left" className="h-4 w-4" />
      </Link>
    </Button>
  );
}
