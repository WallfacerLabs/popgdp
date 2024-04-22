import { ModeratorPanelUser } from "@/types/User";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@/components/icons/dotsHorizontalIcon";

import { BlockUserForm } from "./blockUserForm";

interface BlockUserButtonProps {
  user: ModeratorPanelUser;
}

export const BlockUserButton = ({ user }: BlockUserButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="border-transparent">
          <DotsHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <BlockUserForm user={user} />
      </PopoverContent>
    </Popover>
  );
};
