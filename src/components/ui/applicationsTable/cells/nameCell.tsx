import { Application } from "@/types/Application";

import { Badge } from "../../badge";
import { TableCell } from "../../table";

interface NameCellProps {
  name: Application["name"];
  draft?: Application["draft"];
}

export const NameCell = ({ name, draft }: NameCellProps) => {
  return (
    <TableCell className="relative">
      {draft && (
        <Badge
          variant="gray"
          className="!absolute left-0 top-0 min-h-[auto] rounded-l-none py-0"
        >
          Draft
        </Badge>
      )}
      <span className="font-bold">{name}</span>
    </TableCell>
  );
};
