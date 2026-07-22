import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  allowedDevOrigins: ["127.0.0.1"],
  // OpenNext CF handles routing via assets binding; keep stable build
};

export default config;
