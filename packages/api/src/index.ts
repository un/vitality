// Export the app router
export { appRouter } from './routers';
export type { AppRouter } from './routers';

// Export procedures
export {
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure
} from './procedures';
export type { TRPCContext } from './procedures';

// Export context helpers
export { createTRPCContext } from './utils/context';