"use client";

import { MAX_ITEMS_PER_PAGE } from "@/constants/pagination";
import { getFilteredUsers } from "@/utils/getFilteredUsers";

import { ModeratorPanelUser } from "@/types/User";
import { useUsersSearchState } from "@/hooks/useUsersSearchState";
import { UserFiltersPanel } from "@/components/ui/filterPanels/userFiltersPanel";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import { UsersTable } from "@/components/ui/usersTable/usersTable";

interface UsersProps {
  users: ModeratorPanelUser[];
}

export function Users({ users }: UsersProps) {
  const { page, search, onSearchPhraseChange } = useUsersSearchState();

  const filteredUsers = getFilteredUsers({
    users,
    search,
  });

  const applicationsCount = filteredUsers.length;
  const totalPages = Math.ceil(applicationsCount / MAX_ITEMS_PER_PAGE);

  const currentPageUsers = filteredUsers.slice(
    (page - 1) * MAX_ITEMS_PER_PAGE,
    page * MAX_ITEMS_PER_PAGE,
  );

  return (
    <>
      <UserFiltersPanel
        searchPhrase={search}
        onSearchPhraseChange={onSearchPhraseChange}
      />

      <UsersTable users={currentPageUsers} />

      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
