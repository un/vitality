import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as schema from "./schema";

export const DB_NAME = "augmented_local";

export function useDB() {
  const dbContext = useSQLiteContext();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useDrizzleStudio(dbContext);
  return drizzle(dbContext, { schema });
}
