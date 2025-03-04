export enum Integrations {
  AUGMENT_AIR = "augmentAir",
  APPLE_HEALTH = "appleHealth",
  OURA = "oura",
  ULTRAHUMAN = "ultrahuman",
  WHOOP = "whoop",
}

export enum IntegrationAccessMode {
  LOCAL = "local",
  API = "api",
  WEBHOOK = "webhook",
  MANUAL = "manual",
}

export type IntegrationAccessData =
  | { token: string; refreshToken: string | null; expiry: Date }
  | Record<string, never>;

// Type to ensure array is compatible with mysqlEnum
type MySQLEnumCompatible<T extends string> = readonly [T, ...T[]];

// Get values as array
//! NEVER DELETE FROM THIS ARRAY, ONLY ADD
export const INTEGRATIONS_ARRAY = [
  Integrations.AUGMENT_AIR,
  Integrations.APPLE_HEALTH,
  Integrations.OURA,
  Integrations.ULTRAHUMAN,
  Integrations.WHOOP,
] as const;

// Create a properly typed array for mysqlEnum from the enum values
// We use a two-step assertion to satisfy TypeScript
export const INTEGRATIONS_ARRAY_FOR_MYSQL = Object.values(
  Integrations,
) as unknown as readonly [string, ...string[]];

// Get values as array
export const INTEGRATION_ACCESS_MODE_ARRAY = [
  IntegrationAccessMode.LOCAL,
  IntegrationAccessMode.API,
  IntegrationAccessMode.WEBHOOK,
  IntegrationAccessMode.MANUAL,
] as const;

// Create a properly typed array for mysqlEnum from the enum values
// We use a two-step assertion to satisfy TypeScript
export const INTEGRATION_ACCESS_MODE_FOR_MYSQL = Object.values(
  IntegrationAccessMode,
) as unknown as readonly [string, ...string[]];
