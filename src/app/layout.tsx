import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AxiomWebVitals } from "next-axiom";

import "./globals.css";

import { urls } from "@/constants/urls";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { cn } from "@/lib/cn";
import { AccountButton } from "@/components/ui/accountButton";
import { Button } from "@/components/ui/button";
import { DevFloatingPanel } from "@/components/ui/devPanel/devPanel";
import { Separator } from "@/components/ui/separator";
import { AssignmentIcon } from "@/components/icons/assignmentIcon";
import { ProductAnimatedIcon } from "@/components/icons/productAnimatedIcon";
import { TuneIcon } from "@/components/icons/tuneIcon";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | POPGDP",
    default: "POPGDP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AxiomWebVitals />
      <body
        className={cn(
          "flex min-h-screen flex-col items-center bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <DevFloatingPanel />
        <header className="mx-auto grid w-full max-w-[1384px] grid-cols-[292px_1fr_292px] items-center gap-8 p-3">
          <Button
            variant="link"
            className="flex items-center gap-1.5 justify-self-start px-0 font-bold before:bottom-2 before:right-0 before:w-[calc(100%-46px)] before:bg-primary/0"
            asChild
          >
            <Link
              href={urls.root}
              className="before:left-[unset] before:right-0"
            >
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

        <main className="mx-auto mt-8 w-full max-w-[1144px] flex-grow px-3">
          {children}
        </main>

        <footer className="mx-auto mb-6 mt-8 w-full max-w-[1144px] px-3">
          <Separator className="mb-6 w-full" decorative />
          <p className="text-center text-xs font-semibold">
            © 2024 POPGDP. All rights reserved
          </p>
        </footer>
      </body>
    </html>
  );
}

async function Navigation() {
  const isModerator = await userHasRole(UserPermission.moderator);

  return (
    <nav className="justify-self-center">
      <ul className="flex gap-6">
        <li>
          <Button variant="link" asChild className="font-bold">
            <Link href={urls.root}>
              <AssignmentIcon /> Submissions
            </Link>
          </Button>
        </li>
        {isModerator && (
          <li>
            <Button variant="link" className="font-bold" asChild>
              <Link href={urls.moderator.applications}>
                <TuneIcon />
                Moderator panel
              </Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
