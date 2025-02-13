import { sql } from "drizzle-orm";
import {
  blob,
  customType,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const userProfile = sqliteTable("user_profile", {
  name: text("name"),
  signupDate: integer("signupDate", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  currentStreakStartDate: integer("currentStreakStart", { mode: "timestamp" }),
  currentStreakEndDate: integer("currentStreakEnd", { mode: "timestamp" }),
  currentStreakDays: integer("currentStreakDays"),
  longestStreakDays: integer("longestStreakDays"),
  avatarImage: blob("avatarImage"),
});

export const tasks = sqliteTable("tasks", {
  id: text(),
  title: text(),
  description: text(),
  status: text(),
});

export type Task = typeof tasks.$inferSelect;
