import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep development runs from appending generated instructions to AGENTS.md.
  agentRules: false,
};

export default nextConfig;
