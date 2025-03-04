import { router } from '../procedures';
import { userRouter } from './user';
import { healthRouter } from './health';

export const appRouter = router({
  user: userRouter,
  health: healthRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;