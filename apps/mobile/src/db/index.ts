import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as schema from "./schema";

export function useDB() {
  const dbContext = useSQLiteContext();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useDrizzleStudio(dbContext);
  const db = drizzle(dbContext, { schema });

  return db;
}
