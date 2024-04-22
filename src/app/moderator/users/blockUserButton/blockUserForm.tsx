"use server";

import { ModeratorPanelUser } from "@/types/User";
import { Button } from "@/components/ui/button";

import { blockUserAction } from "./blockUserAction";

interface BlockUserFormProps {
  user: ModeratorPanelUser;
}

export async function BlockUserForm({ user }: BlockUserFormProps) {
  const isBlockedAndHidden = user.isBlocked && user.isContentHidden;

  return (
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
  );
}
