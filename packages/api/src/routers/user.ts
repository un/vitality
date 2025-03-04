import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { adminProcedure, protectedProcedure, publicProcedure, router } from '../procedures';

export const userRouter = router({
  // Public route - get current user
  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return null;
    }
    
    try {
      const user = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, ctx.user.id),
      });
      
      return user;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user',
        cause: error,
      });
    }
  }),
  
  // Protected route - update user profile
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to update your profile',
        });
      }
      
      try {
        // This is just an example - actual implementation would depend on your schema
        const updatedUser = await ctx.db.query.users.findFirst({
          where: (users, { eq }) => eq(users.id, ctx.user.id),
        });
        
        return {
          success: true,
          user: updatedUser,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update profile',
          cause: error,
        });
      }
    }),
  
  // Admin route - get all users
  listAll: adminProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(10),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        // This is just an example - actual implementation would depend on your schema
        const users = await ctx.db.query.users.findMany({
          limit: input.limit,
          // Add cursor-based pagination logic here based on your schema
        });
        
        return {
          users,
          nextCursor: users.length === input.limit ? users[users.length - 1].id : undefined,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch users',
          cause: error,
        });
      }
    }),
});