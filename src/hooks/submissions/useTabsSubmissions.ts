import { Application } from "@/types/Application";
import { UserId } from "@/types/User";

interface UserSubmissionsProps {
  applications: Application[];
  userId: UserId | undefined;
}

export function useTabsSubmissions({
  applications,
  userId,
}: UserSubmissionsProps) {
  const userApplications = applications.filter(
    (application) => application.userId === userId,
  );

  return { allApplications: applications, userApplications };
}
