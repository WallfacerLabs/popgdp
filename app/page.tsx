import Link from "next/link";
import { getWaves } from "@/drizzle/queries/waves";

import { formatDateRange } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageTitle } from "@/components/ui/pageTitle";

export default async function Home() {
  const waves = await getWaves();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-between">
        <PageTitle>Current waves</PageTitle>
        <Button variant="secondary" asChild>
          <Link href="waves/create">Create wave</Link>
        </Button>
      </div>
      <ol className="flex flex-col gap-8">
        {waves.map((wave) => (
          <li key={wave.id}>
            <Card>
              <CardHeader>
                <CardTitle>{wave.name}</CardTitle>
              </CardHeader>
              <CardContent>
                This is a wave of grants
                <br /> Duration: {formatDateRange(wave.startsAt, wave.endsAt)}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild>
                  <Link href={`/waves/${wave.id}`}>Go to details</Link>
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
