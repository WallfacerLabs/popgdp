import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getCategoriesForWave } from "@/drizzle/queries/categories";
import { getUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";
import { parseApplicationParams } from "@/lib/paramsValidation";

export const metadata: Metadata = {
  title: "Draft preview",
};

const PreviewEdit = dynamic(() => import("./previewEdit"), {
  ssr: false,
});

export default async function EditPreviewPage({ params }: { params: unknown }) {
  const userId = await getUserId();
  const user = await getUser(userId);
  const { applicationId, waveId } = parseApplicationParams(params);
  const categories = await getCategoriesForWave(waveId);

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <PreviewEdit
      user={user}
      categories={categories}
      waveId={waveId}
      applicationId={applicationId}
    />
  );
}
