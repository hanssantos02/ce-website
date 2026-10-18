import "server-only";
import { cache } from "react";
import { createClient } from "../supabase/server";

export const getVerifiedUser = cache(async () => {
  const client = await createClient();
  if (!client) return undefined;
  try {
    const { data, error } = await client.auth.getUser();
    return error ? undefined : data.user ?? undefined;
  } catch { return undefined; }
});

export async function isSignedIn() {
  const client = await createClient();
  if (!client) return false;
  try { const { data, error } = await client.auth.getClaims(); return !error && !!data?.claims.sub; }
  catch { return false; }
}
