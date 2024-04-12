import { ModeratorPanelUser } from "@/types/User";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@/components/icons/dotsHorizontalIcon";

import { blockUserAction } from "./blockUserAction";

interface BlockUserButtonProps {
  user: ModeratorPanelUser;
}

export function BlockUserButton({ user }: BlockUserButtonProps) {
  const isBlockedAndHidden = user.isBlocked && user.isContentHidden;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="border-transparent">
          <DotsHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="justify-start border-transparent"
            formAction={async () => {
              "use server";

              await blockUserAction({
                userId: user.id,
                isBlocked: !user.isBlocked,
                isContentHidden: false,
              });
            }}
          >
            {user.isBlocked ? "Unblock user" : "Block user"}
          </Button>
          <Button
            variant="outline"
            className="justify-start border-transparent text-red"
            formAction={async () => {
              "use server";

              await blockUserAction({
                userId: user.id,
                isBlocked: !isBlockedAndHidden,
                isContentHidden: !isBlockedAndHidden,
              });
            }}
          >
            {isBlockedAndHidden
              ? "Unblock and show user content"
              : "Block and hide user content"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
