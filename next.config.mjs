import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const basePath = "/ijas-awards";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export (GitHub Pages) is enabled only by scripts/static-build.mjs.
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export" } : {}),
  basePath,
  // Stable build id so an unchanged site produces an identical export (no empty deploys).
  generateBuildId: async () => process.env.NEXT_BUILD_ID || null,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Smart search: transformers.js runs in Node for the build-time index and in the browser for queries.
  serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node", "sharp"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@huggingface/transformers": path.join(projectRoot, "node_modules/@huggingface/transformers/dist/transformers.web.js"),
        "onnxruntime-node": false,
        sharp: false,
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
