import {
  bigint,
  binary,
  boolean,
  customType,
  index,
  int,
  json,
  longtext,
  mediumint,
  mediumtext,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  tinyint,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import type {
  CloudIdTypePrefixNames,
  CloudTypeId,
} from "@augmented/utils/typeid";
import {
  cloudTypeIdFromUUIDBytes,
  cloudTypeIdGenerator,
  cloudTypeIdToUUIDBytes,
} from "@augmented/utils/typeid";
import { UserRoles } from "@augmented/utils/types/auth";
import {
  MINERALS_ARRAY,
  MINERALS_ARRAY_AS_ENUM,
  VITAMINS_ARRAY_AS_ENUM,
} from "@augmented/utils/types/consumption";
import {
  INTEGRATION_ACCESS_MODE_ARRAY,
  INTEGRATION_ACCESS_MODE_ARRAY_AS_ENUM,
  IntegrationAccessData,
  INTEGRATIONS_ARRAY,
  INTEGRATIONS_ARRAY_AS_ENUM,
} from "@augmented/utils/types/integrations";

// User logging records tables

export const sleepLogs = mysqlTable("sleepLogs", {
  id: typeId("sleepLog", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("sleepLog")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  rawData: json("rawData"),
  source: mysqlEnum("type", [...INTEGRATIONS_ARRAY_AS_ENUM]).notNull(),
  sourceSessionId: varchar("sourceSessionId", { length: 128 }),
  totalDuration: tinyint("totalDuration"),
  timeBed: tinyint("timeBed"),
  timeAwake: tinyint("timeAwake"),
  timeLight: tinyint("timeLight"),
  timeRem: tinyint("timeRem"),
  timeDeep: tinyint("timeDeep"),
  disturbances: tinyint("disturbances"),
  quality: tinyint("quality"),
  score: tinyint("score"),
  isNap: boolean("isNap"),
  start: timestamp("start"),
  end: timestamp("end"),
  timezoneOffset: tinyint("timezoneOffset"),
  createdAt: timestamp("created_at").notNull(),
});

export const airLogs = mysqlTable("airLogs", {
  id: typeId("airLog", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("airLog")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  rawData: json("rawData"),
  source: mysqlEnum("type", [...INTEGRATIONS_ARRAY_AS_ENUM]).notNull(),
  sourceSessionId: varchar("sourceSessionId", { length: 128 }),
  readingTime: timestamp("created_at").notNull(),
  co2: tinyint("co2"),
  temperature: tinyint("temperature"),
  humidity: tinyint("humidity"),
  timezoneOffset: tinyint("timezoneOffset"),
  createdAt: timestamp("created_at").notNull(),
});
