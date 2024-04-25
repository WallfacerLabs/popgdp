import { ModeratorPanelUser } from "@/types/User";

interface FilteredUsersProps {
  users: ModeratorPanelUser[];
  search: string;
}

export function getFilteredUsers({ users, search }: FilteredUsersProps) {
  return users.filter(
    ({ name, ethereumAddress }) =>
      name?.toLowerCase().includes(search.toLowerCase()) ||
      ethereumAddress?.toLowerCase().includes(search.toLowerCase()),
  );
}
