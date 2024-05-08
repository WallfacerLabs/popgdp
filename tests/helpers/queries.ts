import { db } from "@/drizzle/db";
import {
  Application,
  Category,
  Moderator,
  Reviewer,
  User,
  Wave,
} from "@/drizzle/schema";

import { WaveStage } from "@/config/waveStages";
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

const defaultWaveDates = {
  openStartDate: addDays(new Date(), 1),
  denoisingStartDate: addDays(new Date(), 2),
  assesmentStartDate: addDays(new Date(), 3),
  closeDate: addDays(new Date(), 4),
};

export async function createWave(waveId: number) {
  await db.insert(Wave).values({
    id: waveId,
    name: "First wave",
    summary: "Wave summary",
    ...defaultWaveDates,
  });
}

function getUpdatedWaveDates(waveStage: WaveStage) {
  switch (waveStage) {
    case "notOpen": {
      return {};
    }
    case "open": {
      return { openStartDate: addDays(new Date(), -1) };
    }
    case "denoising": {
      return { denoisingStartDate: addDays(new Date(), -1) };
    }
    case "assesment": {
      return { assesmentStartDate: addDays(new Date(), -1) };
    }
    case "close": {
      return { closeDate: addDays(new Date(), -1) };
    }
  }
}

export async function updateWaveStage(waveStage: WaveStage) {
  await db
    .update(Wave)
    .set({ ...defaultWaveDates, ...getUpdatedWaveDates(waveStage) });
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
