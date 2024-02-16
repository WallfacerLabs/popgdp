"use server";

import { createWaveSchema } from "./createWaveSchema";

export async function createWaveAction(data: createWaveSchema) {
  console.log(data);

  return {};
}
