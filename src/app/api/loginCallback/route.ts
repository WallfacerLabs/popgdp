import { NextResponse } from "next/server";
import { UnauthenticatedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { insertUser } from "@/drizzle/queries/user";

import { env } from "@/config/env";
import { getUserId } from "@/lib/auth";

export async function GET(_: Request, context: { params: unknown }) {
  const userId = await getUserId();
  if (!userId) {
    throw new UnauthenticatedError();
  }

  await insertUser({
    id: userId,
  });

  return NextResponse.redirect(env.AUTH0_BASE_URL + urls.profile.mainDetails);
}
