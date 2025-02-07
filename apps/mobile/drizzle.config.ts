import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./db-migrations",
  driver: "expo",
  dialect: "sqlite",
} satisfies Config;
