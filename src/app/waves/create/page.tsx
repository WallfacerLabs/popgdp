import { auth } from "@/lib/auth";
import { Unauthenticated } from "@/components/ui/unauthenticated";

import { CreateWaveForm } from "./createWaveForm";

export default async function CreateWave() {
  const session = await auth();

  if (!session?.user?.id) {
    return <Unauthenticated />;
  }

  return <CreateWaveForm />;
}
