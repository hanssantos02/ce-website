import type { EmailLink } from "./policy.ts";
import { parseEmailLink } from "./policy.ts";

export const emailLinkCookie = "cepath-email-link";
export const emailLinkOptions = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/auth", maxAge: 600 };

export function readStagedEmailLink(value?: string): EmailLink | undefined {
  if (!value || value.length > 4096) return undefined;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed.tokenHash !== "string" || typeof parsed.type !== "string") return undefined;
    return parseEmailLink(new URLSearchParams({ token_hash: parsed.tokenHash, type: parsed.type }).toString());
  } catch { return undefined; }
}
