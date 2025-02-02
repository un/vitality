import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
