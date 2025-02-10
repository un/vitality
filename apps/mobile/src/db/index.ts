import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as schema from "./schema";

export function useDB() {
  try {
    const dbContext = useSQLiteContext();
    if (!dbContext) {
      throw new Error("Database context is not available");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useDrizzleStudio(dbContext);
    const db = drizzle(dbContext, { schema });
    return db;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export { schema };
