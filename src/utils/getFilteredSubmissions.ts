import { Application, ModeratorApplication } from "@/types/Application";
import { Category } from "@/types/Category";

interface FilteredSubmissionsProps<
  T extends Application | ModeratorApplication,
> {
  applications: T[];
  category: Category["id"] | undefined;
  search: string;
}

export function getFilteredSubmissions<
  T extends Application | ModeratorApplication,
>({ applications, category, search }: FilteredSubmissionsProps<T>): T[] {
  return applications
    .filter(
      (application: T) =>
        category === "all" || !category || application.category.id === category,
    )
    .filter((application: T) =>
      application.name.toLowerCase().includes(search.toLowerCase()),
    );
}
