import { Context, MiddlewareHandler } from 'hono';
import { auth } from '@augmented/auth';

// Middleware to check authentication and set user on context
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const session = await auth.verifySession(token);
      if (session) {
        // Set user in Hono context
        c.set('user', {
          id: session.userId,
          role: session.user?.role || 'user',
        });
      }
    } catch (error) {
      // Token verification failed, continue without user
    }
  }
  
  await next();
};