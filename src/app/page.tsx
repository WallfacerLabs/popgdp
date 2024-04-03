import Link from "next/link";
import { urls } from "@/constants/urls";
import { getWaves } from "@/drizzle/queries/waves";

import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { WavePreview } from "@/components/ui/wavePreview.tsx/wavePreview";

export default async function Home() {
  const waves = await getWaves();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Current waves</PageTitle>
        <Button variant="secondary" asChild>
          <Link href={urls.waves.create}>Create wave</Link>
        </Button>
      </div>
      <ol className="flex flex-col gap-8">
        {waves.map((wave) => (
          <WavePreview wave={wave} key={wave.id} />
        ))}
      </ol>
    </div>
  );
}
