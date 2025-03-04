import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./schema.ts",
  dialect: "mysql",
  dbCredentials: { url: process.env.DB_MYSQL_URL! },
});
