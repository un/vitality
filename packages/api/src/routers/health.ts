import { z } from 'zod';
import { publicProcedure, router } from '../procedures';

export const healthRouter = router({
  // Public health check endpoint
  ping: publicProcedure.query(() => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }),
  
  // Echo endpoint with input validation
  echo: publicProcedure
    .input(z.object({
      message: z.string().min(1),
    }))
    .query(({ input }) => {
      return {
        echo: input.message,
        timestamp: new Date().toISOString(),
      };
    }),
  
  // System info endpoint
  info: publicProcedure.query(() => {
    return {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      uptime: process.uptime(),
    };
  }),
});