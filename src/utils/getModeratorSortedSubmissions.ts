import { ModeratorApplication } from "@/types/Application";
import { sortObjectsByKey } from "@/lib/sort";
import { ModeratorSubmissionsSortBy } from "@/components/ui/applicationsTable/moderatorApplicationsTable";

interface ModeratorSortedSubmissionsProps {
  applications: ModeratorApplication[];
  sortBy: ModeratorSubmissionsSortBy;
}

export function getModeratorSortedSubmissions({
  applications,
  sortBy,
}: ModeratorSortedSubmissionsProps) {
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
    case "upvotes":
      return sortObjectsByKey(applications, ["helpfulCount"], sortBy.asc);
    case "spam":
      return sortObjectsByKey(applications, ["spamCount"], sortBy.asc);
    case "category":
      return sortObjectsByKey(applications, ["category", "name"], sortBy.asc);
  }
}
