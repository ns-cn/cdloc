import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  // OpenNext CF handles routing via assets binding; keep stable build
};

export default config;
