import { getPublishedLessonHrefs } from "../../content/published-lessons.ts";

export type AuthMode = "signup" | "login" | "forgot-password" | "update-password";
export type FieldErrors = Partial<Record<"email" | "password" | "confirmPassword", string>>;
export type AuthState = { status: "idle" | "error" | "success" | "pending-email"; message?: string; errors?: FieldErrors; email?: string; destination?: string };

export function safeDestination(value: unknown): string {
  return typeof value === "string" && ["/account", "/dashboard", "/update-password", "/curriculum", ...getPublishedLessonHrefs()].includes(value) ? value : "/account";
}

export function validateAuthFields(mode: AuthMode, fields: Record<string, unknown>) {
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const password = typeof fields.password === "string" ? fields.password : "";
  const confirmation = typeof fields.confirmPassword === "string" ? fields.confirmPassword : "";
  const errors: FieldErrors = {};
  if (mode !== "update-password" && (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.email = "Enter a valid email address.";
  if (mode !== "forgot-password" && !password) errors.password = "Enter your password.";
  if ((mode === "signup" || mode === "update-password") && (!confirmation || password !== confirmation)) errors.confirmPassword = "The passwords must match.";
  return { email, password, errors };
}

export function readSupabaseConfig(url?: string, key?: string) {
  if (!url || !key?.startsWith("sb_publishable_") || /your_|placeholder/.test(key) || /your-project|placeholder/.test(url)) return undefined;
  try {
    const parsed = new URL(url);
    const local = ["localhost", "127.0.0.1"].includes(parsed.hostname);
    if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/" || (parsed.protocol !== "https:" && !(local && parsed.protocol === "http:"))) return undefined;
    return { url: parsed.origin, key };
  } catch { return undefined; }
}

export function resolveSiteUrl(value: string | undefined, production: boolean) {
  if (!value) return production ? undefined : "http://localhost:3000";
  try {
    const parsed = new URL(value);
    const local = ["localhost", "127.0.0.1"].includes(parsed.hostname);
    if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/" || (parsed.protocol !== "https:" && !(local && parsed.protocol === "http:"))) return undefined;
    return parsed.origin;
  } catch { return undefined; }
}

export type EmailLink = { tokenHash: string; type: "email" | "signup" | "recovery" };
export function parseEmailLink(query: string): EmailLink | undefined {
  const params = new URLSearchParams(query);
  const tokenHash = params.get("token_hash");
  const type = params.get("type");
  if (!tokenHash || tokenHash.length > 2048 || params.getAll("token_hash").length !== 1 || params.getAll("type").length !== 1) return undefined;
  if (type !== "email" && type !== "signup" && type !== "recovery") return undefined;
  return { tokenHash, type };
}

export function parseCodeCallback(query: string) {
  const params = new URLSearchParams(query);
  const code = params.get("code");
  if (!code || code.length > 2048 || params.getAll("code").length !== 1) return undefined;
  return { code, destination: safeDestination(params.get("next")) };
}

export function authErrorMessage(code?: string) {
  if (code === "over_request_rate_limit" || code === "over_email_send_rate_limit") return "Too many requests. Please wait before trying again.";
  if (code === "email_not_confirmed") return "Sign-in could not be completed. Check your email for a confirmation link, or check your email and password.";
  if (code === "weak_password") return "Choose a stronger password. Try a longer, unique combination of words, letters and symbols.";
  if (code === "same_password") return "Choose a different password from your current password.";
  return "We couldn’t complete that request. Check your details and try again. If the service is unavailable, try again later.";
}
