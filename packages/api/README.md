# @augmented/api

Shared tRPC API definitions and utilities for Augmented applications.

## Features

- Type-safe tRPC v11 API definitions
- Shared router and procedure definitions
- Authentication and authorization middleware
- Reusable across multiple applications

## Usage

### Server-side (Hono)

```typescript
// apps/cloud/src/index.ts
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { trpcServer } from 'better-call/trpc';
import { appRouter, createTRPCContext } from '@augmented/api';

const app = new Hono();

// Setup tRPC with BetterAuth
const trpcHandler = trpcServer({
  router: appRouter,
  createContext: (c) => createTRPCContext(c),
  prefix: '/trpc'
});

app.use(trpcHandler);

serve({
  fetch: app.fetch,
  port: 3000,
});
```

### Client-side (React Native)

```typescript
// apps/mobile/src/utils/api.ts
import { createClient } from '@augmented/api/client';
import { getToken } from './auth';

export const api = createClient({
  url: 'https://api.yourapp.com/trpc',
  headers: async () => {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
});

// Then use it in your components
const user = await api.user.me.query();
```

### Creating New Routers

To add a new router:

1. Create a new file in the `src/routers` directory
2. Define your router using the exported procedures
3. Add it to the main router in `src/routers/index.ts`

```typescript
// src/routers/product.ts
import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../procedures';

export const productRouter = router({
  list: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(({ ctx, input }) => {
      // Implementation
    }),
  
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      // Implementation
    }),
});

// src/routers/index.ts
import { router } from '../procedures';
import { productRouter } from './product';

export const appRouter = router({
  // ... existing routers
  product: productRouter,
});
```