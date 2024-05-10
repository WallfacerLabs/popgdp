import Link from "next/link";
import { urls } from "@/constants/urls";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { Button } from "@/components/ui/button";
import { AssignmentIcon } from "@/components/icons/assignmentIcon";
import { TuneIcon } from "@/components/icons/tuneIcon";

export async function Navigation() {
  const isModerator = await userHasRole(UserPermission.moderator);

  return (
    <nav className="justify-self-center">
      <ul className="flex gap-6">
        <li>
          <Button variant="link" asChild className="font-bold">
            <Link href={urls.root}>
              <AssignmentIcon /> Submissions
            </Link>
          </Button>
        </li>
        {isModerator && (
          <li>
            <Button variant="link" className="font-bold" asChild>
              <Link href={urls.moderator.waves}>
                <TuneIcon />
                Moderator panel
              </Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
