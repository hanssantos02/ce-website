import { NextResponse, type NextRequest } from "next/server";
import { getSiteUrl } from "../../../lib/supabase/config";
import { parseEmailLink } from "../../../lib/auth/policy";
import { emailLinkCookie, emailLinkOptions } from "../../../lib/auth/email-link";

export async function GET(request: NextRequest) {
  const origin = getSiteUrl();
  if (!origin) return new NextResponse("Account services are unavailable.", { status: 503, headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" } });
  const link = parseEmailLink(request.nextUrl.search);
  const response = NextResponse.redirect(new URL(link ? "/auth/verify" : "/login?error=email-link", origin));
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  // GET never consumes a bearer link. The same-origin confirmation action does.
  response.cookies.set(emailLinkCookie, link ? JSON.stringify(link) : "", { ...emailLinkOptions, maxAge: link ? 600 : 0 });
  return response;
}
