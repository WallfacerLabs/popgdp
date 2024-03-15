import { AccountButton } from "./accountButton";
import { PageTitle } from "./pageTitle";

export function Unauthenticated() {
  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <PageTitle>Unauthenticated</PageTitle>
      <AccountButton />
    </div>
  );
}
