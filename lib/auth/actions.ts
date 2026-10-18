"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getSiteUrl } from "../supabase/config";
import { performAuth, confirmEmailLink } from "./service";
import { emailLinkCookie, emailLinkOptions, readStagedEmailLink } from "./email-link";
import type { AuthMode, AuthState } from "./policy";

async function submit(mode: AuthMode | "signout", data: FormData): Promise<AuthState> {
  const client = await createClient(true);
  const siteUrl = getSiteUrl();
  if (!client || !siteUrl) return { status: "error", message: "Account services are unavailable right now. You can still explore the public curriculum." };
  const result = await performAuth(mode, Object.fromEntries(data), client.auth, siteUrl);
  if (result.destination) { revalidatePath("/", "layout"); redirect(result.destination); }
  return result;
}

export async function signupAction(_state: AuthState, data: FormData) { return submit("signup", data); }
export async function loginAction(_state: AuthState, data: FormData) { return submit("login", data); }
export async function recoveryAction(_state: AuthState, data: FormData) { return submit("forgot-password", data); }
export async function updatePasswordAction(_state: AuthState, data: FormData) { return submit("update-password", data); }
export async function signoutAction(_state: AuthState, data: FormData) { return submit("signout", data); }

export async function confirmEmailAction(): Promise<void> {
  const store = await cookies();
  const link = readStagedEmailLink(store.get(emailLinkCookie)?.value);
  store.set(emailLinkCookie, "", { ...emailLinkOptions, maxAge: 0 });
  const client = await createClient(true);
  if (!link || !client) redirect("/login?error=email-link");
  const result = await confirmEmailLink(link, client.auth);
  if (result.destination) { revalidatePath("/", "layout"); redirect(result.destination); }
  redirect(link.type === "recovery" ? "/forgot-password?error=email-link" : "/login?error=email-link");
}
