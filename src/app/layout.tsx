import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AxiomWebVitals } from "next-axiom";

import "./globals.css";

import { cn } from "@/lib/cn";
import { AccountButton } from "@/components/ui/accountButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductIcon } from "@/components/icons/productIcon";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "POPGDP",
  description: "Generated by create next app",
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
        <header className="mx-auto flex w-full max-w-[1384px] items-center justify-between gap-8 p-3">
          <Button
            variant="link"
            className="flex items-center gap-1.5 px-0 font-bold before:bottom-2 before:right-0 before:w-[calc(100%-46px)] before:bg-primary/0"
            asChild
          >
            <Link href="/">
              <ProductIcon className="!h-10 !w-10" aria-label="POPGDP logo" />
              <h1 className="px-3">POPGDP</h1>
            </Link>
          </Button>
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
