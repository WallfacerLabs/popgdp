import Link from "next/link";
import { urls } from "@/constants/urls";

import { type WaveWithCategories } from "@/types/Wave";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { Separator } from "@/components/ui/separator";
import { TimelinePreview } from "@/components/ui/wavesTimelinePreview/timelinePreview";

interface WavePreviewProps {
  wave: WaveWithCategories;
}

export function WavePreview({ wave }: WavePreviewProps) {
  return (
    <li key={wave.id}>
      <Card className="bg-gray-50">
        <CardHeader className="flex-row justify-between">
          <CardTitle>{wave.name}</CardTitle>
          <Button asChild>
            <Link href={urls.waves.preview({ waveId: wave.id })}>
              Go to wave
            </Link>
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
