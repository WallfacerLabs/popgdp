import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { urls } from "@/constants/urls";
import { db } from "@/drizzle/db";
import { getUser, getUserRoles } from "@/drizzle/queries/user";
import { Moderator, Reviewer } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { getUserId } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsIcon } from "@/components/icons/settingsIcon";

export async function DevFloatingPanel() {
  const userId = await getUserId();
  if (!userId) return null;

  const userData = await getUser(userId);

  const { isReviewer, isModerator } = await getUserRoles(userId);

  const isSkipWaveCheckEnabled =
    cookies().get("skipWaveStageCheck")?.value === "true";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-6 right-6" size="icon">
          <SettingsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8}>
        <form className="flex flex-col gap-3">
          {!userData?.ethereumAddress && (
            <Link
              href={urls.profile}
              className="font-mono text-blue-400 underline"
            >
              Add your ethereum address first
            </Link>
          )}

          {isReviewer ? (
            <Button
              formAction={async () => {
                "use server";
                await db
                  .delete(Reviewer)
                  .where(
                    eq(Reviewer.ethereumAddress, userData?.ethereumAddress!),
                  );
                revalidatePath("/");
              }}
            >
              Remove reviewer role
            </Button>
          ) : (
            <Button
              disabled={!userData?.ethereumAddress}
              formAction={async () => {
                "use server";
                await db
                  .insert(Reviewer)
                  .values({ ethereumAddress: userData?.ethereumAddress! });

                revalidatePath("/");
              }}
            >
              Add reviewer role
            </Button>
          )}

          {isModerator ? (
            <Button
              formAction={async () => {
                "use server";
                await db
                  .delete(Moderator)
                  .where(
                    eq(Moderator.ethereumAddress, userData?.ethereumAddress!),
                  );
                revalidatePath("/");
              }}
            >
              Remove moderator role
            </Button>
          ) : (
            <Button
              disabled={!userData?.ethereumAddress}
              formAction={async () => {
                "use server";
                await db
                  .insert(Moderator)
                  .values({ ethereumAddress: userData?.ethereumAddress! });

                revalidatePath("/");
              }}
            >
              Add moderator role
            </Button>
          )}

          {isSkipWaveCheckEnabled ? (
            <Button
              formAction={async () => {
                "use server";
                cookies().set("skipWaveStageCheck", "false");
                revalidatePath("/");
              }}
            >
              Enable skip stage check
            </Button>
          ) : (
            <Button
              formAction={async () => {
                "use server";
                cookies().set("skipWaveStageCheck", "true");
                revalidatePath("/");
              }}
            >
              Disable skip stage check
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
}
