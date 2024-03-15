import { db } from "@/drizzle/db";
import { waves } from "@/drizzle/schema";
import { expect, test } from "@playwright/test";

import { getPageWithLoggedUser } from "./utils/getPageWithLoggedUser";

test.beforeEach(async () => {
  await db.delete(waves);
});

test("cannot access page if not authenticated", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Create wave" }).click();

  await expect(page.getByText("Unauthenticated")).toBeVisible();
});

test("creates a new wave", async ({ browser }) => {
  const page = await getPageWithLoggedUser(browser);

  await page.goto("/");

  await page.getByRole("link", { name: "Create wave" }).click();

  await page.getByLabel("Wave name").click();
  await page.getByLabel("Wave name").fill("First wave");

  await page.getByRole("button", { name: "Create wave" }).click();

  await expect(page.getByText("Submissions")).toBeVisible();

  await page.goto("/");

  await expect(page.getByText("First wave")).toBeVisible();
  await expect(page.getByText("This is a wave of grants")).toBeVisible();
  await expect(page.getByText("Duration:")).toBeVisible();
  await expect(page.getByText("Go to details")).toBeVisible();
});
