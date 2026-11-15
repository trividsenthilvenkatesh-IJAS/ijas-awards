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
};

export default nextConfig;
