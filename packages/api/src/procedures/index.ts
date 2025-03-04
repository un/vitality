import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@augmented/auth';
import { db } from '@augmented/db';
import { z } from 'zod';

// Define the context type for our API
export interface TRPCContext {
  db: typeof db;
  auth: typeof auth;
  user?: {
    id: string;
    role: string;
  } | null;
}

// Create a new tRPC instance
const t = initTRPC.context<TRPCContext>().create();

// Export reusable router and procedure builders
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to ensure user is authenticated
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Middleware to check if user has required role
const hasRole = (allowedRoles: string[]) =>
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource',
      });
    }

    if (!allowedRoles.includes(ctx.user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to access this resource',
      });
    }

    return next({
      ctx,
    });
  });

// Create protected procedures
export const protectedProcedure = publicProcedure.use(isAuthenticated);

// Admin procedure that requires admin role
export const adminProcedure = protectedProcedure.use(
  hasRole(['admin', 'super_admin'])
);