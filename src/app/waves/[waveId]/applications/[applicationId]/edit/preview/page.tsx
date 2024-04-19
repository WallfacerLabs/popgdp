import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";

import { EditPreview } from "./editPreview";

export default async function EditPreviewPage() {
  const userId = await getUserId();
  const user = await getUser(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return <EditPreview user={user} />;
}
