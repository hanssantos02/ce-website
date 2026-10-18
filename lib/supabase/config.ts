import { readSupabaseConfig, resolveSiteUrl } from "../auth/policy";

export function getSupabaseConfig() {
  return readSupabaseConfig(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export function getSiteUrl() {
  return resolveSiteUrl(process.env.APP_SITE_URL, process.env.NODE_ENV === "production");
}
