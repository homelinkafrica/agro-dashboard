import "server-only";
import { randomUUID } from "node:crypto";
import { sampleFarms } from "./sample-data";
import type { Farm } from "./types";

/**
 * In-memory farm store, seeded with the sample farms so the list page still has
 * something to show. Resets whenever the server process restarts.
 *
 * TODO: replace with real persistence alongside the auth mock database.
 */
const farms: Farm[] = [...sampleFarms];

export function listFarms(): Farm[] {
  return farms;
}

export function createFarm(input: Omit<Farm, "id">): Farm {
  const farm: Farm = { id: randomUUID(), ...input };
  farms.push(farm);
  return farm;
}
