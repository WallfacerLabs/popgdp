import { urls } from "@/constants/urls";
import { db } from "@/drizzle/db";
import { Wave } from "@/drizzle/schema";
import { expect, test } from "@playwright/test";

import { getPageWithLoggedUser } from "./utils/getPageWithLoggedUser";
import { mockDate } from "./utils/mockDate";

const config = {
  waveName: "First wave",
  waveSummary: "This is a wave of grants",
  categoryName: "Category 1",
  categoryDescription: "Description 1",
};

test.beforeEach(async () => {
  await db.delete(Wave);
});

test("cannot access page if not authenticated", async ({ page }) => {
  await page.goto(urls.root);

  await page.getByRole("link", { name: "Create wave" }).click();

  await expect(page.getByText("Unauthenticated")).toBeVisible();
});

test("creates a new wave", async ({ browser }) => {
  const page = await getPageWithLoggedUser(browser);

  await mockDate(page, new Date("Jun 1 2020 00:00:00"));

  await page.goto(urls.root);

  await page.getByRole("link", { name: "Create wave" }).click();

  await page.getByLabel("Wave name*").click();
  await page.getByLabel("Wave name").fill(config.waveName);

  await page.getByLabel("Wave summary*").click();
  await page.getByLabel("Wave summary").fill(config.waveSummary);

  await page.getByLabel("Category icon*").click();
  await page.getByRole("radio").first().click();

  await page.getByLabel("#1 Category*").click();
  await page.getByLabel("#1 Category").fill(config.categoryName);

  await page.getByLabel("Category description*").click();
  await page
    .getByLabel("Category description")
    .fill(config.categoryDescription);

  await page.getByRole("button", { name: "Next" }).click();

  await page
    .locator("div")
    .filter({ hasText: /^openStart date\*Pick a date$/ })
    .getByLabel("Start date*")
    .click();
  await page.getByRole("gridcell", { name: "1", exact: true }).nth(1).click();

  await page
    .locator("div")
    .filter({ hasText: /^denoisingStart date\*Pick a date$/ })
    .getByLabel("Start date*")
    .click();
  await page.getByRole("gridcell", { name: "2", exact: true }).nth(1).click();

  await page
    .locator("div")
    .filter({ hasText: /^assesmentStart date\*Pick a date$/ })
    .getByLabel("Start date*")
    .click();
  await page.getByRole("gridcell", { name: "3", exact: true }).nth(1).click();

  await page.locator("div").getByLabel("Close date*").click();
  await page.getByRole("gridcell", { name: "4", exact: true }).nth(1).click();

  await page.getByRole("button", { name: "Preview" }).click();

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByRole("link", { name: "Apply for Grant" }),
  ).toBeVisible();
});
