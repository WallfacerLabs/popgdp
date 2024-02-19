export default function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  return <div>Application {params.applicationId}</div>;
}
