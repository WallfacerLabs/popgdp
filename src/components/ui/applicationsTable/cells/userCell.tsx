import { ImageData } from "@/constants/validationSchemas";

import { EtherscanLink } from "@/components/ui/etherscanLink";
import { TableCell } from "@/components/ui/table";
import { UserAvatar } from "@/components/ui/userAvatar";

import { Badge } from "../../badge";

interface UserCellProps {
  name: string | null;
  ethereumAddress: string | null | undefined;
  image: ImageData | null | undefined;
  isBlocked?: boolean;
  blockedBadgeText?: string;
}

export const UserCell = ({
  name,
  ethereumAddress,
  image,
  isBlocked,
  blockedBadgeText,
}: UserCellProps) => {
  return (
    <TableCell className="relative">
      {isBlocked && (
        <Badge
          variant="red"
          className="!absolute left-0 top-0 min-h-[auto] rounded-l-none py-0"
        >
          {blockedBadgeText}
        </Badge>
      )}

      <div className="mt-2 flex gap-3">
        <UserAvatar image={image} />
        <div className="flex flex-col justify-center gap-1">
          <span className="font-bold">{name}</span>
          {ethereumAddress && (
            <EtherscanLink ethereumAddress={ethereumAddress} short />
          )}
        </div>
      </div>
    </TableCell>
  );
};
