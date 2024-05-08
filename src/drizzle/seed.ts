import { faker } from "@faker-js/faker";

import { categoryColors } from "@/types/CategoryColor";
import { addDays } from "@/lib/dates";

import { connection, db } from "./db";
import { Application, Category, Wave } from "./schema";

function getRandomWave(): typeof Wave.$inferInsert {
  return {
    name: faker.music.genre() + " Wave",
    summary: faker.lorem.paragraph(10),
    openStartDate: addDays(new Date(), 1),
    denoisingStartDate: addDays(new Date(), 2),
    assesmentStartDate: addDays(new Date(), 3),
    closeDate: addDays(new Date(), 4),
  };
}

function getRandomCategory(waveId: number): typeof Category.$inferInsert {
  return {
    waveId,
    name: faker.commerce.productAdjective(),
    color: faker.helpers.arrayElement(categoryColors),
    description: faker.lorem.paragraph(),
  };
}

interface RandomApplicationArgs {
  categoryIds: Array<string>;
  userIds: Array<string>;
  waveId: number;
}

function getRandomApplication({
  categoryIds,
  userIds,
  waveId,
}: RandomApplicationArgs): typeof Application.$inferInsert {
  return {
    draft: faker.datatype.boolean(),
    name: faker.word.words({ count: { min: 1, max: 6 } }),
    summary: faker.lorem.paragraph(10),
    entityName: faker.company.name(),
    email: faker.internet.email(),
    duration: String(faker.number.int({ min: 30, max: 900 })),
    budget: faker.number.int({ min: 1_000, max: 10_000_000 }),
    categoryId: faker.helpers.arrayElement(categoryIds),

    teamSummary: faker.lorem.paragraph(10),

    idea: faker.lorem.paragraph(10),
    reason: faker.lorem.paragraph(10),
    state: faker.lorem.paragraph(10),
    goals: faker.lorem.paragraph(10),
    requirements: faker.lorem.paragraph(10),

    tbd: faker.lorem.paragraph(10),

    imageId: null,
    waveId,
    userId: faker.helpers.arrayElement(userIds),
  };
}

async function main() {
  await db.delete(Wave);
  const userIds = (await db.query.User.findMany()).map((user) => user.id);

  const waves = await db
    .insert(Wave)
    .values(
      faker.helpers.multiple(getRandomWave, { count: { min: 2, max: 10 } }),
    )
    .returning();
  const waveIds = waves.map((wave) => wave.id);

  for (const waveId of waveIds) {
    const categories = await db
      .insert(Category)
      .values(
        faker.helpers.multiple(() => getRandomCategory(waveId), {
          count: { min: 1, max: 5 },
        }),
      )
      .returning({ id: Category.id });
    const categoryIds = categories.map((category) => category.id);

    await db
      .insert(Application)
      .values(
        faker.helpers.multiple(
          () => getRandomApplication({ categoryIds, userIds, waveId }),
          { count: { min: 5, max: 2000 } },
        ),
      );
  }
}

main().then(() => {
  connection.end();
});
