export enum Integrations {
  AUGMENT_AIR = "augmentAir",
  APPLE_HEALTH = "appleHealth",
  OURA = "oura",
  ULTRAHUMAN = "ultrahuman",
  WHOOP = "whoop",
}

export const integrationsAsArray = ["appleHealth"] as const;

export enum IntegrationAccessMode {
  LOCAL = "local",
  API = "api",
  WEBHOOK = "webhook",
  MANUAL = "manual",
}

export type IntegrationAccessData =
  | {
      token: string;
      refreshToken: string | null;
      expiry: Date;
    }
  | {};
