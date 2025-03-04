import { auth } from '@augmented/auth';
import { db } from '@augmented/db';
import { TRPCContext } from '../procedures';
import type { Context } from 'hono';

// Helper to create context from Hono request
export async function createTRPCContext(c: Context): Promise<TRPCContext> {
  const authHeader = c.req.header('Authorization');
  let user = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const session = await auth.verifySession(token);
      if (session) {
        user = {
          id: session.userId,
          role: session.user?.role || 'user',
        };
      }
    } catch (error) {
      // Invalid token, user remains null
    }
  }

  return {
    db,
    auth,
    user,
  };
}