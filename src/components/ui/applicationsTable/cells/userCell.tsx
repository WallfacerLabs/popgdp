import { Application } from "@/types/Application";
import { EtherscanLink } from "@/components/ui/etherscanLink";
import { TableCell } from "@/components/ui/table";
import { UserAvatar } from "@/components/ui/userAvatar";

export const UserCell = ({ user }: Pick<Application, "user">) => {
  const { ethereumAddress, image, name } = user;
  return (
    <TableCell>
      <div className="flex gap-3">
        <UserAvatar image={image} />
        <div className="flex flex-col gap-1">
          <span className="font-bold">{name}</span>
          {ethereumAddress && (
            <EtherscanLink ethereumAddress={ethereumAddress} />
          )}
        </div>
      </div>
    </TableCell>
  );
};
