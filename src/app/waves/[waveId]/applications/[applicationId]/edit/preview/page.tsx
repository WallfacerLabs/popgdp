import { getCategoriesForWave } from "@/drizzle/queries/categories";
import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";

import { EditPreview } from "./editPreview";

export default async function EditPreviewPage({ params }: { params: unknown }) {
  const userId = await getUserId();
  const user = await getUser(userId);
  const { waveId } = parseWaveParams(params);
  const categories = await getCategoriesForWave(waveId);

  if (!user) {
    throw new Error("User not found");
  }

  return <EditPreview user={user} categories={categories} />;
}
