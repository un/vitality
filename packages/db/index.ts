import "dotenv/config";

import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "./schema";

export const db = drizzle(process.env.DB_MYSQL_URL!, { schema });
export type DBType = typeof db;
