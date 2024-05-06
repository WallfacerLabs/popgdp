import Link from "next/link";
import { urls } from "@/constants/urls";
import { getWaves } from "@/drizzle/queries/waves";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/pageHeader";
import { WavePreview } from "@/components/ui/wavePreview.tsx/wavePreview";

export default async function Home() {
  const isModerator = await userHasRole(UserPermission.moderator);

  const waves = await getWaves();

  return (
    <div className="flex w-full flex-col gap-4">
      <PageHeader title="Current waves">
        {isModerator && (
          <Button variant="secondary" asChild>
            <Link href={urls.waves.create}>Create wave</Link>
          </Button>
        )}
      </PageHeader>

      <ol className="flex flex-col gap-8">
        {waves.map((wave) => (
          <WavePreview wave={wave} key={wave.id} />
        ))}
      </ol>
    </div>
  );
}
