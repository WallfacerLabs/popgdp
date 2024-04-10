import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AxiomWebVitals } from "next-axiom";

import "./globals.css";

import { cn } from "@/lib/cn";
import { DevFloatingPanel } from "@/components/ui/devPanel/devPanel";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { TooltipProvider } from "@/components/ui/tooltip";

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
      <TooltipProvider delayDuration={100}>
        <body
          className={cn(
            "flex min-h-screen flex-col items-center bg-background font-sans antialiased",
            inter.variable,
          )}
        >
          <DevFloatingPanel />
          <Header />

          <main className="mx-auto mt-8 w-full max-w-[1144px] flex-grow px-3">
            {children}
          </main>

          <Footer />
        </body>
      </TooltipProvider>
    </html>
  );
}
