import { ImageData } from "@/constants/validationSchemas";

import { EtherscanLink } from "@/components/ui/etherscanLink";
import { TableCell } from "@/components/ui/table";
import { UserAvatar } from "@/components/ui/userAvatar";

interface UserCellProps {
  name: string | null;
  ethereumAddress: string | null | undefined;
  image: ImageData | null | undefined;
}

export const UserCell = ({ name, ethereumAddress, image }: UserCellProps) => {
  return (
    <TableCell>
      <div className="flex gap-3">
        <UserAvatar image={image} />
        <div className="flex flex-col gap-1">
          <span className="font-bold">{name}</span>
          {ethereumAddress && (
            <EtherscanLink ethereumAddress={ethereumAddress} short />
          )}
        </div>
      </div>
    </TableCell>
  );
};
