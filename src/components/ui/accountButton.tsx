import Image from "next/image";
import Link from "next/link";
import { urls } from "@/constants/urls";
import worldIDorb from "@/images/worldIDorb.png";
import { getSession } from "@auth0/nextjs-auth0";

import { getUserPermission, UserPermission } from "@/config/userPermissions";
import { LogoutIcon } from "@/components/icons/logoutIcon";
import { UserIcon } from "@/components/icons/userIcon";

import { ChevronIcon } from "../icons/chevronIcon";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";

export async function AccountButton() {
  const session = await getSession();
  const userRoleText = await getUserRoleText();

  if (session) {
    return (
      <Popover>
        <div className="flex items-center justify-self-end">
          {userRoleText && (
            <span className="-mr-10 flex h-10 items-center rounded-3xl border px-3 pr-12 text-xs font-semibold">
              {userRoleText}
            </span>
          )}
          <PopoverTrigger asChild>
            <Button className="group rounded-3xl px-4">
              <Image
                src={worldIDorb}
                alt=""
                className="h-6 w-6"
                placeholder="blur"
              />
              World ID connected
              <ChevronIcon
                direction="down"
                className="transition-transform group-data-[state=open]:scale-y-[-100%]"
              />
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
    <Button className="w-24 justify-self-end" asChild>
      <a href={urls.auth.login}>Sign in</a>
    </Button>
  );
}

async function getUserRoleText() {
  const userPermission = await getUserPermission();

  switch (userPermission) {
    case UserPermission.blocked:
      return "Banned";
    case UserPermission.moderator:
      return "Moderator";
    case UserPermission.reviewer:
      return "Reviewer";
    default:
      return undefined;
  }
}
