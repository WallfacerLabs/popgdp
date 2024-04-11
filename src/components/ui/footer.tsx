import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mx-auto mb-6 mt-8 w-full max-w-[1144px] px-3">
      <Separator className="mb-6 w-full" decorative />
      <p className="text-center text-xs font-semibold">
        © 2024 POPGDP. All rights reserved
      </p>
    </footer>
  );
}
