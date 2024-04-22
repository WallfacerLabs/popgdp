import { Application } from "@/types/Application";
import { UserId } from "@/types/User";

interface UserSubmissionsProps {
  applications: Application[];
  userId: UserId | undefined;
}

export function getTabsSubmissions({
  applications,
  userId,
}: UserSubmissionsProps) {
  const allApplications = applications.filter(
    (application) => !(application.draft && application.userId !== userId),
  );
  const userApplications = applications.filter(
    (application) => application.userId === userId,
  );

  return { allApplications, userApplications };
}
