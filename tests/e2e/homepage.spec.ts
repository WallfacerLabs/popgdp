import { urls } from "@/constants/urls";
import { expect, test } from "@playwright/test";

import { getPageWithLoggedUser } from "./utils/getPageWithLoggedUser";

test("renders project name", async ({ page }) => {
  await page.goto(urls.root);

  await expect(page).toHaveTitle(/POPGDP/);
});

test("renders without user signed in", async ({ page }) => {
  await page.goto(urls.root);

  await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
});

test("renders with user signed in", async ({ browser }) => {
  const page = await getPageWithLoggedUser(browser);

  await page.goto(urls.root);

  await expect(
    page.getByRole("button", { name: "World ID connected" }),
  ).toBeVisible();
});
