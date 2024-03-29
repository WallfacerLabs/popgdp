import { Application } from "@/types/Application";

import { TableCell } from "../../table";
import { WldAmount } from "../../wldAmount";

export const BudgetCell = ({ budget }: Pick<Application, "budget">) => {
  return (
    <TableCell>
      <WldAmount amount={budget} />
    </TableCell>
  );
};
