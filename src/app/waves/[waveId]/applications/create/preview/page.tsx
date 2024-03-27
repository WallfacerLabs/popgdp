import dynamic from "next/dynamic";
import { getCategoriesForWave } from "@/drizzle/queries/categories";
import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const PreviewApplication = dynamic(() => import("./applicationPreview"), {
  ssr: false,
});

export default async function PreviewApplicationPage({
  params,
}: {
  params: unknown;
}) {
  const { waveId } = parseWaveParams(params);
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

  const [categories, user] = await Promise.all([
    getCategoriesForWave(waveId),
    getUser(userId),
  ]);

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <PreviewApplication waveId={waveId} categories={categories} user={user} />
  );
}
