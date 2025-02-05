import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  customType
} from 'drizzle-orm/pg-core';
import {
  typeIdFromUUID,
  typeIdToUUID,
  typeIdGenerator
} from '@flow/utils/typeid';
import type { IdTypePrefixNames, TypeId } from '@flow/utils/typeid';
import { UserRoles } from '@flow/auth';

const typeId = <const T extends IdTypePrefixNames>(
  prefix: T,
  columnName: string
) =>
  customType<{
    data: TypeId<T>;
    driverData: string;
  }>({
    dataType() {
      return 'uuid';
    },
    fromDriver(input: string): TypeId<T> {
      return typeIdFromUUID(prefix, input);
    },
    toDriver(input: TypeId<T>): string {
      return typeIdToUUID(input).uuid;
    }
  })(columnName);

export const users = pgTable('users', {
  id: typeId('user', 'id')
    .primaryKey()
    .$default(() => typeIdGenerator('user')),
  username: text('username').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  role: text('role').notNull().default(UserRoles.USER),
  banned: boolean('banned').notNull().default(false),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires_at'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const sessions = pgTable('sessions', {
  id: typeId('session', 'id')
    .primaryKey()
    .$default(() => typeIdGenerator('session')),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: typeId('user', 'user_id')
    .notNull()
    .references(() => users.id),
  impersonatedBy: typeId('user', 'impersonated_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const accounts = pgTable('accounts', {
  id: typeId('account', 'id')
    .primaryKey()
    .$default(() => typeIdGenerator('account')),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: typeId('user', 'user_id')
    .notNull()
    .references(() => users.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verificationTokens = pgTable('verification_tokens', {
  id: typeId('verification', 'id')
    .primaryKey()
    .$default(() => typeIdGenerator('verification')),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});

export const passkeys = pgTable('passkeys', {
  id: typeId('passkey', 'id')
    .primaryKey()
    .$default(() => typeIdGenerator('passkey')),
  name: text('name'),
  publicKey: text('public_key'),
  userId: typeId('user', 'user_id')
    .notNull()
    .references(() => users.id),
  credentialID: text('credential_id'),
  counter: integer('counter'),
  deviceType: text('device_type'),
  backedUp: boolean('backed_up'),
  transports: text('transports'),
  createdAt: timestamp('created_at')
});
