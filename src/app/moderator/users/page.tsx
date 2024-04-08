import { PageTitle } from "@/components/ui/pageTitle";

export default async function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Manage</PageTitle>
      </div>
      <div>Users</div>
    </div>
  );
}
