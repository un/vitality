import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userProfile = sqliteTable("user_profile", {
  name: text("name"),
  signupDate: text("signupDate").default(sql`(CURRENT_TIMESTAMP)`),
});

export const tasks = sqliteTable("tasks", {
  id: text(),
  title: text(),
  description: text(),
  status: text(),
});

export type Task = typeof tasks.$inferSelect;
