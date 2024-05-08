"use client";

import { MAX_ITEMS_PER_PAGE } from "@/constants/pagination";
import { getFilteredUsers } from "@/utils/getFilteredUsers";

import { ModeratorPanelUser } from "@/types/User";
import { sortObjectsByKey } from "@/lib/sort";
import { useSortState } from "@/hooks/useSortState";
import { useUsersSearchState } from "@/hooks/useUsersSearchState";
import { UserFiltersPanel } from "@/components/ui/filterPanels/userFiltersPanel";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import {
  ModeratorUsersSortBy,
  UsersTable,
} from "@/components/ui/usersTable/usersTable";

export const MODERATOR_USERS_LIST_COLUMNS = [
  "user",
  "address",
  "reviews",
  "invalid",
  "useful",
  "submissions",
] as const;

interface UsersProps {
  users: ModeratorPanelUser[];
}

export function Users({ users }: UsersProps) {
  const { page, search, onSearchPhraseChange } = useUsersSearchState();

  const { sortBy, handleSortBy } = useSortState({
    columns: MODERATOR_USERS_LIST_COLUMNS,
    defaultDescendingColumns: ["reviews", "invalid", "useful", "submissions"],
  });

  const sortedUsers = getModeratorSortedUsers({
    users,
    sortBy,
  });

  const filteredUsers = getFilteredUsers({
    users: sortedUsers,
    search,
  });

  const usersCount = filteredUsers.length;
  const totalPages = Math.ceil(usersCount / MAX_ITEMS_PER_PAGE);

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

      <UsersTable
        users={currentPageUsers}
        sortBy={sortBy}
        setSortBy={handleSortBy}
      />

      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}

function getModeratorSortedUsers({
  users,
  sortBy,
}: {
  users: ModeratorPanelUser[];
  sortBy: ModeratorUsersSortBy;
}) {
  switch (sortBy.sortName) {
    case "user":
    default:
      return sortObjectsByKey(users, ["name"], sortBy.asc);
    case "address":
      return sortObjectsByKey(users, ["ethereumAddress"], sortBy.asc);
    case "reviews":
      return sortObjectsByKey(users, ["reviewsCount"], sortBy.asc);
    case "invalid":
      return sortObjectsByKey(users, ["invalidCount"], sortBy.asc);
    case "useful":
      return sortObjectsByKey(users, ["helpfulCount"], sortBy.asc);
    case "submissions":
      return sortObjectsByKey(users, ["submissionsCount"], sortBy.asc);
  }
}
