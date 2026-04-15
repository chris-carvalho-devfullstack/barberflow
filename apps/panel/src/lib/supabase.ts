import { createBrowserClient } from "@supabase/ssr";

// Este cliente deve ser usado apenas em Client Components
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
