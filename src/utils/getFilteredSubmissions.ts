import { Application } from "@/types/Application";
import { Category } from "@/types/Category";

interface FilteredSubmissionsProps {
  applications: Application[];
  category: Category["id"] | undefined;
  search: string;
}

export function getFilteredSubmissions({
  applications,
  category,
  search,
}: FilteredSubmissionsProps) {
  return applications
    .filter(
      (application) =>
        category === "all" || !category || application.categoryId === category,
    )
    .filter((application) =>
      application.name.toLowerCase().includes(search.toLowerCase()),
    );
}
