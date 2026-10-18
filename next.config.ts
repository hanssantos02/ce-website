import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { mdxOptions } from "./mdx-options.mjs";

const nextConfig: NextConfig = {
  // Keep development runs from appending generated instructions to AGENTS.md.
  agentRules: false,
  // Callback query strings carry one-time credentials; never include them in dev request logs.
  logging: { incomingRequests: { ignore: [/\/auth\/(confirm|callback)/] } },
};

export default createMDX({ options: mdxOptions })(nextConfig);
