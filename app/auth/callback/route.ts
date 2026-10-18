import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { getSiteUrl } from "../../../lib/supabase/config";
import { parseCodeCallback } from "../../../lib/auth/policy";
import { exchangeAuthCode } from "../../../lib/auth/service";

export async function GET(request: NextRequest) {
  const origin = getSiteUrl();
  if (!origin) return new NextResponse("Account services are unavailable.", { status: 503, headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" } });
  const input = parseCodeCallback(request.nextUrl.search);
  const client = await createClient(true);
  const result = input && client ? await exchangeAuthCode(input, client.auth) : undefined;
  const response = NextResponse.redirect(new URL(result?.destination ?? (input?.destination === "/update-password" ? "/forgot-password?error=email-link" : "/login?error=email-link"), origin));
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
