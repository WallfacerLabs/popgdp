import { Page } from "@playwright/test";

export async function mockDate(page: Page, date: Date) {
  const fakeNow = date.valueOf();

  await page.addInitScript(`{
        // Extend Date constructor to default to fakeNow
        Date = class extends Date {
          constructor(...args) {
            if (args.length === 0) {
              super(${fakeNow});
            } else {
              super(...args);
            }
          }
        }
        // Override Date.now() to start from fakeNow
        const __DateNowOffset = ${fakeNow} - Date.now();
        const __DateNow = Date.now;
        Date.now = () => __DateNow() + __DateNowOffset;
      }`);
}
