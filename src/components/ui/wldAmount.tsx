import { formatNumber } from "@/lib/numbers";
import { WorldcoinIcon } from "@/components/icons/worldcoinIcon";

export function WldAmount({ amount }: { amount: number }) {
  return (
    <div className="flex items-center">
      <span className="font-bold">{formatNumber(amount)}</span>
      <WorldcoinIcon className="ml-2 mr-1 h-4 w-4" />
      <span className="text-foreground/60">WLD</span>
    </div>
  );
}
