import { localTypeIdDrizzleDataType as typeIdColumn } from "@/utils/typeid";
import { relations, sql } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { uiColors } from "~/utils/uiColors";

export const userProfile = sqliteTable("user_profile", {
  id: integer("id", { mode: "number" }).default(sql`(1)`),
  signupDate: integer("signupDate", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  currentStreakStartDate: integer("currentStreakStart", { mode: "timestamp" }),
  currentStreakEndDate: integer("currentStreakEnd", { mode: "timestamp" }),
  currentStreakDays: integer("currentStreakDays", { mode: "number" }),
  longestStreakDays: integer("longestStreakDays", { mode: "number" }),
  avatarImage: blob("avatarImage"),
  name: text("name"),
  goals: text("goals"),
  who: text("whoAreYou"),
  following: text("whoDoYouFollow"),
  currentActivities: text("whatDoYouAlreadyDo"),
  conditions: text("conditions"),
  customAiName: text("customAiName"),
  onboardingCompleted: integer("onboardingCompleted", { mode: "boolean" }),
});

export const dataGroups = sqliteTable("data_groups", {
  id: typeIdColumn("dataGroup", "id"),
  name: text(),
  description: text(),
  color: text({ enum: uiColors }), //enum of UI color
  icon: text(), //enum of UI icon
});

export const dataGroupRelationships = relations(dataGroups, ({ many }) => ({
  dataGroupUnits: many(dataGroupUnits),
  dataGroupTargets: many(dataGroupTargets),
  dataGroupMeasurements: many(dataGroupMeasurements),
}));

export const dataGroupUnits = sqliteTable("data_groups_units", {
  id: typeIdColumn("dataGroupUnit", "id"),
  dataGroupId: typeIdColumn("dataGroup", "dataGroupId"),
  type: text({ enum: ["timestamp", "number", "checked", "rating"] }),
  unitLabel: text(),
  unitMin: integer("unitMin", { mode: "number" }),
  unitMax: integer("unitMax", { mode: "number" }),
});

export const dataGroupUnitRelationships = relations(
  dataGroupUnits,
  ({ one, many }) => ({
    dataGroup: one(dataGroups, {
      fields: [dataGroupUnits.dataGroupId],
      references: [dataGroups.id],
    }),
    dataGroupTargets: many(dataGroupTargets),
    dataGroupMeasurements: many(dataGroupMeasurements),
  }),
);

export const dataGroupTargets = sqliteTable("data_group_targets", {
  id: typeIdColumn("dataGroupTarget", "id"),
  dataGroupId: typeIdColumn("dataGroup", "dataGroupId"),
  dataGroupUnitId: typeIdColumn("dataGroupUnit", "dataGroupUnitId"),
  name: text(),
  type: text({ enum: ["<", ">", "="] }),
  min: integer("min", { mode: "number" }),
  max: integer("max", { mode: "number" }),
  targetDate: integer("targetDate", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" }),
});

export const dataGroupTargetRelations = relations(
  dataGroupTargets,
  ({ one }) => ({
    dataGroup: one(dataGroups, {
      fields: [dataGroupTargets.dataGroupId],
      references: [dataGroups.id],
    }),
    dataGroupUnit: one(dataGroupUnits, {
      fields: [dataGroupTargets.dataGroupUnitId],
      references: [dataGroupUnits.id],
    }),
  }),
);

export const dataGroupMeasurements = sqliteTable("data_group_measurements", {
  id: typeIdColumn("dataGroupMeasurement", "id"),
  dataGroupId: typeIdColumn("dataGroup", "dataGroupId"),
  dataGroupUnitId: typeIdColumn("dataGroupUnit", "dataGroupUnitId"),
  value: integer("value", { mode: "number" }),
  createdAt: integer("createdAt", { mode: "timestamp" }),
});

export const dataGroupMeasurementRelations = relations(
  dataGroupMeasurements,
  ({ one }) => ({
    dataGroup: one(dataGroups, {
      fields: [dataGroupMeasurements.dataGroupId],
      references: [dataGroups.id],
    }),
    dataGroupUnit: one(dataGroupUnits, {
      fields: [dataGroupMeasurements.dataGroupUnitId],
      references: [dataGroupUnits.id],
    }),
  }),
);
