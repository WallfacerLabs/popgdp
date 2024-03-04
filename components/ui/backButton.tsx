import Image from "next/image";
import Link from "next/link";

import arrowLeftIcon from "@/app/images/arrowLeftIcon.svg";

import { Button } from "./button";

export function BackButton({ href }: { href: string }) {
  return (
    <Button size="icon" variant="outline" className="text-sm" asChild>
      <Link href={href}>
        <Image src={arrowLeftIcon} alt="" />
      </Link>
    </Button>
  );
}
