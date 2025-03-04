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

import type { IntegrationAccessData } from "@augmented/utils/types/integrations";
import { cloudTypeIdGenerator } from "@augmented/utils/typeid";
import {
  INTEGRATION_ACCESS_MODE_FOR_MYSQL,
  INTEGRATIONS_ARRAY_FOR_MYSQL,
} from "@augmented/utils/types/integrations";

import { typeIdColumn } from "../customColumnTypes";
import { users } from "./auth";

import "./user";

export const integrations = mysqlTable("integrations", {
  id: typeIdColumn("integration", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("integration")),
  owner: typeIdColumn("user", "user_id")
    .notNull()
    .references(() => users.id),
  ownerId: typeIdColumn("user", "user_id")
    .notNull()
    .references(() => users.id),
  type: mysqlEnum("type", INTEGRATIONS_ARRAY_FOR_MYSQL).notNull(),
  accessMode: mysqlEnum(
    "accessMode",
    INTEGRATION_ACCESS_MODE_FOR_MYSQL,
  ).notNull(),
  accessData: json("accessData").$type<IntegrationAccessData>().default({}),
  createdAt: timestamp("created_at").notNull(),
  lastSync: timestamp("last_sync"),
});
