import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Dev-only. Next blocks its HMR/dev resources for any origin other than
   * localhost, so a dev server exposed through a tunnel renders HTML but never
   * hydrates — every button is dead. Wildcard covers Cloudflare quick tunnels,
   * whose hostnames are random. Has no effect on production builds.
   */
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
