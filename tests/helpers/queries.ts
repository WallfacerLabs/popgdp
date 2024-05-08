import { db } from "@/drizzle/db";
import {
  Application,
  Category,
  Moderator,
  Reviewer,
  User,
  Wave,
} from "@/drizzle/schema";

import { addDays } from "@/lib/dates";

export async function createModerator(userId: string, ethereumAddress = "0x0") {
  await db.insert(Moderator).values({ ethereumAddress });
  await db.insert(User).values({ id: userId, ethereumAddress });
}

export async function createReviewer(userId: string, ethereumAddress = "0x0") {
  await db.insert(Reviewer).values({ ethereumAddress });
  await db.insert(User).values({ id: userId, ethereumAddress });
}

export async function createBlocked(userId: string) {
  await db.insert(User).values({ id: userId, isBlocked: true });
}

export async function createUser(userId: string) {
  await db.insert(User).values({ id: userId });
}

export async function createWave(waveId: number) {
  await db.insert(Wave).values({
    id: waveId,
    name: "First wave",
    summary: "Wave summary",
    openStartDate: new Date(),
    denoisingStartDate: addDays(new Date(), 1),
    assesmentStartDate: addDays(new Date(), 2),
    closeDate: addDays(new Date(), 3),
  });
}

interface CreateCategoryArgs {
  waveId: number;
  categoryId: string;
}

export async function createCategory({
  categoryId,
  waveId,
}: CreateCategoryArgs) {
  await db.insert(Category).values({
    id: categoryId,
    waveId,
    color: "red",
    description: "description",
    name: "name",
  });
}

interface CreateApplicationArgs {
  applicationId: string;
  userId: string;
  waveId: number;
  categoryId: string;
  isDraft: boolean;
}

export async function createApplication({
  applicationId,
  categoryId,
  userId,
  waveId,
  isDraft,
}: CreateApplicationArgs) {
  await db.insert(Application).values({
    id: applicationId,
    userId,
    waveId,
    categoryId,
    budget: 100,
    draft: isDraft,
    duration: "1000",
    email: "random@email.com",
    entityName: "entityName",
    goals: "goals",
    idea: "idea",
    name: "name",
    reason: "reason",
    requirements: "requirements",
    state: "state",
    summary: "summary",
    tbd: "tbd",
    teamSummary: "teamSummary",
  });
}
