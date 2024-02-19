import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { format } from "date-fns";
import Link from "next/link";

export default async function Home() {
  const waves = await db.query.waves.findMany();

  return (
    <div className="flex flex-col gap-4 max-w-xl w-full">
      <div className="text-2xl">Current waves</div>
      <ol className="flex flex-col gap-8">
        {waves.map((wave) => (
          <li key={wave.id}>
            <Card>
              <CardHeader>
                <CardTitle>{wave.name}</CardTitle>
              </CardHeader>
              <CardContent>
                This is a wave of grants
                <br /> Duration: {format(wave.startsAt, "LLL dd, y")} -{" "}
                {format(wave.endsAt, "LLL dd, y")}{" "}
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
