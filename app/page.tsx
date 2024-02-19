import { db } from "@/drizzle/db";

export default async function Home() {
  const waves = await db.query.waves.findMany();

  return (
    <div className="flex flex-col items-center gap-4">
      <div>Current waves</div>
      <ol>
        {waves.map((wave) => (
          <li key={wave.id}>{wave.name}</li>
        ))}
      </ol>
    </div>
  );
}
