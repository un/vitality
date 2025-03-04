import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from './routers';

export type { AppRouter };

/**
 * Create a new tRPC client
 * 
 * @param config Configuration object
 * @returns tRPC client
 * 
 * @example
 * ```ts
 * // Example usage for Next.js app
 * import { createClient } from '@augmented/api/client';
 * 
 * const client = createClient({
 *   url: process.env.NEXT_PUBLIC_API_URL + '/trpc',
 *   headers: () => {
 *     const token = getToken(); // Your token management
 *     return token ? { Authorization: `Bearer ${token}` } : {};
 *   },
 * });
 * 
 * // Example usage for React Native
 * import { createClient } from '@augmented/api/client';
 * 
 * const client = createClient({
 *   url: API_URL + '/trpc',
 *   headers: async () => {
 *     const token = await secureStore.get('auth-token');
 *     return token ? { Authorization: `Bearer ${token}` } : {};
 *   },
 * });
 * ```
 */
export function createClient(config: {
  url: string;
  headers?: () => Record<string, string> | Promise<Record<string, string>>;
}) {
  return createTRPCClient<AppRouter>({
    url: config.url,
    async headers() {
      if (config.headers) {
        return await config.headers();
      }
      return {};
    },
  });
}