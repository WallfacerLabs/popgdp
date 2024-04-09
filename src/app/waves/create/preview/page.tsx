import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { userHasRole, UserPermission } from "@/config/userPermissions";

const WavePreview = dynamic(() => import("./wavePreview"), {
  ssr: false,
});

export default async function PreviewApplicationPage() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
  }

  return <WavePreview />;
}
