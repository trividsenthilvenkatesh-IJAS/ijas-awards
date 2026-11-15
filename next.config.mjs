const basePath = "/ijas-awards";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export (GitHub Pages) is enabled only by scripts/static-build.mjs.
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export" } : {}),
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
