import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: text(),
  title: text(),
  description: text(),
  status: text(),
});

export type Task = typeof tasks.$inferSelect;
