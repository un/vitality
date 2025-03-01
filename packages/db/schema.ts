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
  IntegrationAccessData,
  integrationsAsArray,
} from "@augmented/utils/types/integrations";

const typeId = <const T extends CloudIdTypePrefixNames>(
  prefix: T,
  columnName: string,
) =>
  customType<{
    data: CloudTypeId<T>;
    driverData: string;
  }>({
    dataType() {
      return "binary";
    },
    fromDriver(input: string): CloudTypeId<T> {
      return cloudTypeIdFromUUIDBytes(prefix, Buffer.from(input));
    },
    toDriver(input: CloudTypeId<T>): string {
      return cloudTypeIdToUUIDBytes(input).uuid.toString();
    },
  })(columnName);

export const userProfiles = mysqlTable("user_profiles", {
  id: typeId("userProfile", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("userProfile")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  currentStreakStartDate: timestamp("currentStreakStart"),
  currentStreakEndDate: timestamp("currentStreakEnd"),
  currentStreakDays: int("currentStreakDays"),
  longestStreakDays: int("longestStreakDays"),
  avatarImage: text("avatarImage"),
  goals: text("goals"),
  who: text("whoAreYou"),
  following: text("whoDoYouFollow"),
  currentActivities: text("whatDoYouAlreadyDo"),
  conditions: text("conditions"),
  customAiName: varchar("customAiName", { length: 32 }),
  onboardingCompleted: boolean("onboardingCompleted"),
});

export const integrations = mysqlTable("integrations", {
  id: typeId("integration", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("integration")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  type: mysqlEnum("type", [...integrationsAsArray]).notNull(),
  //! TODO: fix enum types
  accessMode: mysqlEnum("type", [...integrationsAsArray]).notNull(),
  accessData: json("accessData").$type<IntegrationAccessData>().default({}),
  createdAt: timestamp("created_at").notNull(),
  lastSync: timestamp("last_sync"),
});

export const sleeps = mysqlTable("sleeps", {
  id: typeId("sleep", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("sleep")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  rawData: json("rawData"),
  //! TODO: fix enum types
  source: mysqlEnum("type", [...integrationsAsArray]).notNull(),
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

export const airs = mysqlTable("airs", {
  id: typeId("air", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("air")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  rawData: json("rawData"),
  //! TODO: fix enum types
  source: mysqlEnum("type", [...integrationsAsArray]).notNull(),
  sourceSessionId: varchar("sourceSessionId", { length: 128 }),
  readingTime: timestamp("created_at").notNull(),
  //! TODO: check range of tiny int and see if it can reach 10k
  co2: tinyint("co2"),
  temperature: tinyint("temperature"),
  humidity: tinyint("humidity"),
  timezoneOffset: tinyint("timezoneOffset"),
  createdAt: timestamp("created_at").notNull(),
});

export const foods = mysqlTable("foods", {
  id: typeId("food", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("food")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  foodDescription: text("foodDescription"),
  calories: tinyint("calories"),
  protein: tinyint("protein"),
  carbs: tinyint("carbs"),
  fats: tinyint("fats"),
  sugars: tinyint("sugars"),
  consumedAt: timestamp("consumed_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
//! TODO: link to minerals and vitamins

export const drinks = mysqlTable("drinks", {
  id: typeId("drink", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("drink")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  drinkDescription: text("drinkDescription"),
  quantity: tinyint("quantity"),
  caffeine: tinyint("caffeine"),
  alcohol: tinyint("alcohol"),
  water: tinyint("water"),
  consumedAt: timestamp("consumed_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
//! TODO: link to minerals and vitamins

export const minerals = mysqlTable("minerals", {
  id: typeId("mineral", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("mineral")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  //! TODO: Add proper enum types
  type: mysqlEnum("type", ["sodium"]),
  quantity: tinyint("quantity"),
  consumedAt: timestamp("consumed_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const vitamins = mysqlTable("vitamins", {
  id: typeId("vitamin", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("vitamin")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  //! TODO: Add proper enum types
  type: mysqlEnum("type", ["sodium"]),
  quantity: tinyint("quantity"),
  consumedAt: timestamp("consumed_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const supplementCombos = mysqlTable("supplementCombos", {
  id: typeId("supplementCombo", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("supplementCombo")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 64 }),
  measure: varchar("name", { length: 12 }),
  typicalDosage: tinyint("typicalDosage"),
  createdAt: timestamp("created_at").notNull(),
});

export const supplementIngredients = mysqlTable("supplementIngredients", {
  id: typeId("supplementIngredient", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("supplementIngredient")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 64 }),
  measure: varchar("name", { length: 12 }),
  typicalDosage: tinyint("typicalDosage"),
  createdAt: timestamp("created_at").notNull(),
});
//! TODO: link to supplementCombo table
export const supplementVitamins = mysqlTable("supplementVitamins", {
  id: typeId("supplementVitamin", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("supplementVitamin")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  //! TODO: Add proper enum types
  type: mysqlEnum("type", ["sodium"]),
  quantity: tinyint("quantity"),
  createdAt: timestamp("created_at").notNull(),
});
//! TODO: link to supplementCombo table
export const supplementMinerals = mysqlTable("supplementMinerals", {
  id: typeId("supplementMineral", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("supplementMineral")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  //! TODO: Add proper enum types
  type: mysqlEnum("type", ["sodium"]),
  quantity: tinyint("quantity"),
  createdAt: timestamp("created_at").notNull(),
});
//! TODO: link to supplementCombo table

// actual consumption of a suplement
export const supplements = mysqlTable("supplements", {
  id: typeId("supplement", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("supplement")),
  owner: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  ingredient: typeId("supplementIngredient", "ingredient").notNull(),
  vitamin: typeId("supplementVitamin", "vitamin").notNull(),
  mineral: typeId("supplementMineral", "mineral").notNull(),
  quantity: tinyint("quantity"),
  consumedAt: timestamp("consumed_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
//! TODO: link to supplementTypeTable

// Auth related tables

export const users = mysqlTable("users", {
  id: typeId("user", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("user")),
  username: varchar("username", { length: 32 }).notNull().unique(),
  name: varchar("name", { length: 32 }).notNull(),
  email: varchar("email", { length: 32 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  // role: text("role").notNull().default(UserRoles.USER),
  //! TODO: convert type enum to array as string
  role: mysqlEnum("role", [UserRoles.USER]).notNull().default(UserRoles.USER),
  banned: boolean("banned").notNull().default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires_at"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const sessions = mysqlTable("sessions", {
  id: typeId("session", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("session")),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  ipAddress: varchar("ip_address", { length: 36 }),
  userAgent: varchar("user_agent", { length: 256 }),
  userId: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  impersonatedBy: typeId("user", "impersonated_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

//! TODO: check betterauth docs for correct column lengths
export const accounts = mysqlTable("accounts", {
  id: typeId("account", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("account")),
  accountId: varchar("account_id", { length: 32 }).notNull(),
  providerId: varchar("provider_id", { length: 32 }).notNull(),
  userId: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTokens = mysqlTable("verification_tokens", {
  id: typeId("verification", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("verification")),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const passkeys = mysqlTable("passkeys", {
  id: typeId("passkey", "id")
    .primaryKey()
    .$default(() => cloudTypeIdGenerator("passkey")),
  name: text("name"),
  publicKey: text("public_key"),
  userId: typeId("user", "user_id")
    .notNull()
    .references(() => users.id),
  credentialID: text("credential_id"),
  counter: int("counter", { unsigned: true }),
  deviceType: text("device_type"),
  backedUp: boolean("backed_up"),
  transports: text("transports"),
  createdAt: timestamp("created_at"),
});
