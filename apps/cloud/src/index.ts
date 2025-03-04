import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { trpcServer } from 'better-call/trpc';
import { authMiddleware } from './middlewares/auth';
import { appRouter, createTRPCContext } from '@augmented/api';

// Create Hono app
const app = new Hono();

// Register global middlewares
app.use('*', logger());
app.use('*', cors({
  origin: process.env.CORS_ORIGIN || '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true,
}));
app.use('*', authMiddleware);

// Create tRPC v11 handler with betterauth
const trpcHandler = trpcServer({
  router: appRouter,
  createContext: (c) => createTRPCContext(c),
  prefix: '/trpc',
  onError: (ctx) => {
    console.error(ctx.error);
  }
});

// Mount tRPC handler
app.use(trpcHandler);

// Add a basic route for health check
app.get('/', (c) => c.json({ status: 'ok', message: 'Cloud API server is running' }));

// Start server
const port = parseInt(process.env.PORT || '3000', 10);
console.log(`Server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port,
});