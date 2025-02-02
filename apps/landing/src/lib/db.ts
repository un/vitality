import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// @ts-expect-error envs
export const supabase = createClient(supabaseUrl, supabaseKey);
