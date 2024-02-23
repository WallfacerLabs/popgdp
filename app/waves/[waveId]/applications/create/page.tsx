import { getWaves } from "@/drizzle/queries/waves";

import { CreateApplicationForm } from "./createApplicationForm";

export async function generateStaticParams() {
  const waves = await getWaves();

  return waves.map((wave) => ({ waveId: String(wave.id) }));
}

interface CreateApplicationProps {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}

export default function CreateApplication({ params }: CreateApplicationProps) {
  return <CreateApplicationForm waveId={params.waveId} />;
}
