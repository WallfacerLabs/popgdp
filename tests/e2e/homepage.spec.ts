import { test, expect } from "@playwright/test";

test("renders project name", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/POPGDP/);
});

test("renders without user signed in", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("renders with user signed in", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./tests/e2e/.auth/member.json",
  });
  const page = await context.newPage();

  await page.goto("/");

  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
