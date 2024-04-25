import { ModeratorPanelReviewer } from "@/types/Reviewer";

interface FilteredReviewersProps {
  reviewers: ModeratorPanelReviewer[];
  search: string;
}

export function getFilteredReviewers({
  reviewers,
  search,
}: FilteredReviewersProps) {
  return reviewers.filter(({ name }) =>
    name?.toLowerCase().includes(search.toLowerCase()),
  );
}
