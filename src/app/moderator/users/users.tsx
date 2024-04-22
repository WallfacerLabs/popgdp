"use client";

import { getFilteredUsers } from "@/utils/getFilteredUsers";

import { ModeratorPanelUser } from "@/types/User";
import { useUsersSearchState } from "@/hooks/useUsersSearchState";
import { UserFiltersPanel } from "@/components/ui/filterPanels/userFiltersPanel";
import { UsersTable } from "@/components/ui/usersTable/usersTable";

interface UsersProps {
  users: ModeratorPanelUser[];
}

export function Users({ users }: UsersProps) {
  const { search, onSearchPhraseChange } = useUsersSearchState();

  const filteredUsers = getFilteredUsers({
    users,
    search,
  });

  return (
    <>
      <UserFiltersPanel
        searchPhrase={search}
        onSearchPhraseChange={onSearchPhraseChange}
      />

      <UsersTable users={filteredUsers} />
    </>
  );
}
