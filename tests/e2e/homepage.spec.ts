import { test, expect } from "@playwright/test";

test("renders project name", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/POPGDP/);
});
