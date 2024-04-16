import { Application } from "@/types/Application";
import { Category } from "@/types/Category";

interface FilteredSubmissionsProps {
  applications: Application[];
  category: Category["id"];
  search: string;
}

export function useFilteredSubmissions({
  applications,
  category,
  search,
}: FilteredSubmissionsProps) {
  return applications
    .filter(
      (application) =>
        category === "all" || application.categoryId === category,
    )
    .filter((application) =>
      application.name.toLowerCase().includes(search.toLowerCase()),
    );
}
