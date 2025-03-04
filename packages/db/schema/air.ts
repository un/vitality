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

import { cloudTypeIdGenerator } from "@augmented/utils/typeid";
import { INTEGRATIONS_ARRAY_FOR_MYSQL } from "@augmented/utils/types/integrations";

import { typeIdColumn } from "../customColumnTypes";
import { users } from "./auth";

export const airReadings = mysqlTable("airReadings", {
  id: typeIdColumn("airReading", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("airReading")),
  ownerId: typeIdColumn("user", "user_id")
    .notNull()
    .references(() => users.id),
  rawData: json("rawData"),
  source: mysqlEnum("type", INTEGRATIONS_ARRAY_FOR_MYSQL).notNull(),
  sourceSessionId: varchar("sourceSessionId", { length: 128 }),
  readingTime: timestamp("created_at").notNull(),
  co2: tinyint("co2"),
  temperature: tinyint("temperature"),
  humidity: tinyint("humidity"),
  timezoneOffset: tinyint("timezoneOffset"),
  createdAt: timestamp("created_at").notNull(),
});
