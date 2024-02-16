import { signIn, signOut, auth } from "@/lib/auth";
import { SubmitButton } from "./submitButton";

export const AccountButton = async () => {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <SubmitButton>Sign out</SubmitButton>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
};
