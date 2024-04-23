import { Application } from "@/types/Application";
import { sortObjectsByKey } from "@/lib/sort";
import { SubmissionsSortBy } from "@/components/ui/applicationsTable/applicationsTable";

interface SortedSubmissionsProps {
  applications: Application[];
  sortBy: SubmissionsSortBy;
}

export function getSortedSubmissions({
  applications,
  sortBy,
}: SortedSubmissionsProps) {
  switch (sortBy.sortName) {
    case "name":
    default:
      return sortObjectsByKey(applications, ["name"], sortBy.asc);
    case "user":
      return sortObjectsByKey(applications, ["user", "name"], sortBy.asc);
    case "entity":
      return sortObjectsByKey(applications, ["entityName"], sortBy.asc);
    case "submissionDate":
      return sortObjectsByKey(applications, ["createdAt"], sortBy.asc);
    case "budget":
      return sortObjectsByKey(applications, ["budget"], sortBy.asc);
    case "category":
      return sortObjectsByKey(applications, ["category", "name"], sortBy.asc);
  }
}