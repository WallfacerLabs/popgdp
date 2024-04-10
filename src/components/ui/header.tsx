import Link from "next/link";
import { urls } from "@/constants/urls";

import { AccountButton } from "@/components/ui/accountButton";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";
import { ProductAnimatedIcon } from "@/components/icons/productAnimatedIcon";

export function Header() {
  return (
    <header className="mx-auto grid w-full max-w-[1384px] grid-cols-[292px_1fr_292px] items-center gap-8 p-3">
      <Button
        variant="link"
        className="flex items-center gap-1.5 justify-self-start px-0 font-bold before:bottom-2 before:right-0 before:w-[calc(100%-46px)] before:bg-primary/0"
        asChild
      >
        <Link href={urls.root} className="before:left-[unset] before:right-0">
          <ProductAnimatedIcon
            className="!h-10 !w-10"
            aria-label="POPGDP logo"
          />
          <h1 className="px-3">POPGDP</h1>
        </Link>
      </Button>

      <Navigation />

      <AccountButton />
    </header>
  );
}
