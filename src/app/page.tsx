import Link from "next/link";
import { urls } from "@/constants/urls";
import { getWaves } from "@/drizzle/queries/waves";

import { type WaveWithCategories } from "@/types/Wave";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { PageTitle } from "@/components/ui/pageTitle";
import { Separator } from "@/components/ui/separator";

import { TimelinePreview } from "./waves/[waveId]/timeline/timelinePreview";

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

interface WavePreviewProps {
  wave: WaveWithCategories;
}

function WavePreview({ wave }: WavePreviewProps) {
  return (
    <li key={wave.id}>
      <Card className="bg-gray-100">
        <CardHeader className="flex-row justify-between">
          <CardTitle>{wave.name}</CardTitle>
          <Button asChild>
            <Link href={`/waves/${wave.id}`}>Go to wave</Link>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <span className="text-xs">{wave.summary}</span>
          <div>
            <span className="flex items-center gap-2 text-xs font-semibold">
              Categories:
              {wave.categories.map((category) => (
                <CategoryBadge category={category} key={category.id} />
              ))}
            </span>
          </div>
          <Separator className="" />
          <TimelinePreview wave={wave} />
        </CardContent>
      </Card>
    </li>
  );
}
