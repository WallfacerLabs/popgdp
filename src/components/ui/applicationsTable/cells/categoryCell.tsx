import { Application } from "@/types/Application";

import { CategoryBadge } from "../../categories/categoryBadge";
import { TableCell } from "../../table";

export const CategoryCell = ({ category }: Pick<Application, "category">) => {
  return (
    <TableCell>
      <CategoryBadge category={category} />
    </TableCell>
  );
};
