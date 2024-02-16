import { SubmitButton } from "@/components/ui/submitButton";
import { db } from "@/drizzle/db";
import { counters } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const { value = 0 } =
    (await db.query.counters.findFirst({
      columns: { value: true },
      where: eq(counters.id, 1),
    })) ?? {};

  return (
    <div className="flex flex-col items-center gap-4">
      <div>{value}</div>
      <form className="flex gap-6">
        <SubmitButton
          className="w-[120px]"
          formAction={async () => {
            "use server";
            await db
              .insert(counters)
              .values({ value: 1, id: 1 })
              .onConflictDoUpdate({
                target: counters.id,
                set: { value: sql`${counters.value} + 1` },
              });
            revalidatePath("/");
          }}
        >
          Increment
        </SubmitButton>
        <SubmitButton
          className="w-[120px]"
          formAction={async () => {
            "use server";
            await db
              .insert(counters)
              .values({ value: -1, id: 1 })
              .onConflictDoUpdate({
                target: counters.id,
                set: { value: sql`${counters.value} - 1` },
              });
            revalidatePath("/");
          }}
        >
          Decrement
        </SubmitButton>
      </form>
    </div>
  );
}
