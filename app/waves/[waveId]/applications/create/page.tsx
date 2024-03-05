import dynamic from "next/dynamic";

import { BackButton } from "@/components/ui/backButton";

const CreateApplicationForm = dynamic(
  () => import("./createApplicationForm").then((mod) => mod.Form),
  {
    ssr: false,
  },
);

export default function CreateApplication({
  params,
}: {
  params: { waveId: string };
}) {
  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={`/waves/${params.waveId}`} />
        <h2 className="text-2xl font-bold">Apply for the Grant</h2>
      </div>

      <CreateApplicationForm />
    </>
  );
}
