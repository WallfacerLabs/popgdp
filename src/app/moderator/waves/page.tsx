import Link from "next/link";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";
import { getWaves } from "@/drizzle/queries/waves";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { Button } from "@/components/ui/button";
import { ModeratorNavigation } from "@/components/ui/moderatorNavigation";
import { PageHeader } from "@/components/ui/pageHeader";
import { WavePreview } from "@/components/ui/wavePreview.tsx/wavePreview";

export default async function WavesPage() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
  }

  const waves = await getWaves();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Manage">
        <Button asChild>
          <Link href={urls.waves.create}>Create wave</Link>
        </Button>
      </PageHeader>

      <ModeratorNavigation />

      <ol className="flex flex-col gap-8">
        {waves.map((wave) => (
          <WavePreview wave={wave} key={wave.id} />
        ))}
      </ol>
    </div>
  );
}
