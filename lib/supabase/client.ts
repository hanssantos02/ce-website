import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createClient() {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Authentication configuration is unavailable.");
  return createBrowserClient(config.url, config.key, { cookieOptions: { sameSite: "lax", secure: process.env.NODE_ENV === "production" } });
}
