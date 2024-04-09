import Image from "next/image";
import Link from "next/link";
import { urls } from "@/constants/urls";
import worldIDorb from "@/images/worldIDorb.png";
import { getSession } from "@auth0/nextjs-auth0";

import { getUserPermission, UserPermission } from "@/config/userPermissions";
import { LogoutIcon } from "@/components/icons/logoutIcon";
import { UserIcon } from "@/components/icons/userIcon";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";

export async function AccountButton() {
  const session = await getSession();
  const userRoleText = await getUserRoleText();

  if (session) {
    return (
      <Popover>
        <div className="flex items-center justify-self-end rounded-3xl border">
          {userRoleText && (
            <span className="px-4 text-xs font-semibold">{userRoleText}</span>
          )}
          <PopoverTrigger asChild>
            <Button className="rounded-3xl">
              <Image
                src={worldIDorb}
                alt=""
                className="h-6 w-6"
                placeholder="blur"
              />
              World ID connected
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)]">
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link href={urls.profile} className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                My profile
              </Link>
            </li>
            <Separator />
            <li>
              <a
                href={urls.auth.logout}
                className="flex items-center gap-1 text-red"
              >
                <LogoutIcon className="h-4 w-4" /> Disconnect World ID
              </a>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Button className="w-24" asChild>
      <a href={urls.auth.login}>Sign in</a>
    </Button>
  );
}

async function getUserRoleText() {
  const userPermission = await getUserPermission();

  switch (userPermission) {
    case UserPermission.moderator:
      return "Moderator";
    case UserPermission.reviewer:
      return "Reviewer";
    default:
      return undefined;
  }
}
