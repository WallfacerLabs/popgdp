import { ModeratorPanelUser } from "@/types/User";

interface FilteredUsersProps {
  users: ModeratorPanelUser[];
  search: string;
}

export function getFilteredUsers({ users, search }: FilteredUsersProps) {
  return users.filter(({ name }) =>
    name?.toLowerCase().includes(search.toLowerCase()),
  );
}
