import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getCategoriesForWave } from "@/drizzle/queries/categories";
import { getUser } from "@/drizzle/queries/user";

import { canAddSubmission } from "@/config/actionPermissions";
import { parseWaveParams } from "@/lib/paramsValidation";

export const metadata: Metadata = {
  title: "Submission preview",
};

const PreviewApplication = dynamic(() => import("./applicationPreview"), {
  ssr: false,
});

export default async function PreviewApplicationPage({
  params,
}: {
  params: unknown;
}) {
  const { waveId } = parseWaveParams(params);
  const { userId, validationErrorMessage } = await canAddSubmission({ waveId });
  if (typeof validationErrorMessage !== "undefined") {
    throw notFound();
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
