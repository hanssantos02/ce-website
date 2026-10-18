import type { SupabaseClient } from "@supabase/supabase-js";
import { authErrorMessage, safeDestination, validateAuthFields, type AuthMode, type AuthState, type EmailLink } from "./policy.ts";

type AuthGateway = Pick<SupabaseClient["auth"], "signUp" | "signInWithPassword" | "resetPasswordForEmail" | "updateUser" | "signOut" | "getUser" | "verifyOtp" | "exchangeCodeForSession">;
const failure = (code?: string): AuthState => ({ status: "error", message: authErrorMessage(code) });

export async function performAuth(mode: AuthMode | "signout", fields: Record<string, unknown>, auth: AuthGateway, siteUrl: string): Promise<AuthState> {
  try {
    if (mode === "signout") {
      const { error } = await auth.signOut({ scope: "local" });
      return error ? { status: "error", destination: "/login?notice=signout-unconfirmed" } : { status: "success", destination: "/login" };
    }
    const { email, password, errors } = validateAuthFields(mode, fields);
    if (Object.keys(errors).length) return { status: "error", message: "Check the highlighted fields.", errors, email };
    if (mode === "signup") {
      const { data, error } = await auth.signUp({ email, password, options: { emailRedirectTo: `${siteUrl}/auth/callback?next=/account` } });
      if (error) return { ...failure(error.code), email };
      return data.session ? { status: "success", destination: "/account" } : { status: "pending-email", message: "Check your email. If registration can proceed, you’ll receive a confirmation link. Follow it, then return to CEPath. If you already have an account, log in or request a password reset." };
    }
    if (mode === "login") {
      const { data, error } = await auth.signInWithPassword({ email, password });
      if (error || !data.session || !data.user) return { ...failure(error?.code), email };
      return { status: "success", destination: safeDestination(fields.next) };
    }
    if (mode === "forgot-password") {
      const { error } = await auth.resetPasswordForEmail(email, { redirectTo: `${siteUrl}/auth/callback?next=/update-password` });
      return error ? failure(error.code) : { status: "pending-email", message: "If an account can receive recovery email at that address, a password-reset link will arrive. Check your inbox and spam folder. You can continue browsing the curriculum." };
    }
    const { data: identity, error: identityError } = await auth.getUser();
    if (identityError || !identity.user) return { status: "error", message: "Your session could not be verified. Request a new recovery link and try again." };
    const { error } = await auth.updateUser({ password });
    return error ? failure(error.code) : { status: "success", message: "Your password has been updated. Use the new password the next time you log in." };
  } catch { return failure(); }
}

export async function confirmEmailLink(link: EmailLink, auth: AuthGateway): Promise<AuthState> {
  try {
    const { data, error } = await auth.verifyOtp({ token_hash: link.tokenHash, type: link.type });
    if (error || !data.session || !data.user) return { status: "error", message: "This email link is invalid, expired or already used. Request a new link and try again." };
    return { status: "success", destination: link.type === "recovery" ? "/update-password" : "/account" };
  } catch { return { status: "error", message: "We couldn’t verify this link. Please try again or request a new one." }; }
}

export async function exchangeAuthCode(input: { code: string; destination: string }, auth: AuthGateway): Promise<AuthState> {
  try {
    const { data, error } = await auth.exchangeCodeForSession(input.code);
    if (error || !data.session || !data.user) return { status: "error", message: "This link could not be verified. Open it in the browser where you requested it, or request a new link." };
    return { status: "success", destination: safeDestination(input.destination) };
  } catch { return { status: "error", message: "We couldn’t verify this link. Please request a new one." }; }
}
