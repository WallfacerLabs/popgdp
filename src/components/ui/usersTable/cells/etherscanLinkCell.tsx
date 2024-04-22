import { ModeratorPanelUser } from "@/types/User";

import { EtherscanLink } from "../../etherscanLink";
import { TableCell } from "../../table";

interface EtherscanLinkCellProps {
  ethereumAddress: ModeratorPanelUser["ethereumAddress"];
}

export const EtherscanLinkCell = ({
  ethereumAddress,
}: EtherscanLinkCellProps) => {
  return (
    <TableCell>
      {ethereumAddress ? (
        <EtherscanLink ethereumAddress={ethereumAddress} />
      ) : (
        <span>-</span>
      )}
    </TableCell>
  );
};
