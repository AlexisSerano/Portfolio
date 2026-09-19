import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/Portfolio" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || "",
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
