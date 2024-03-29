/** @type {import('next').NextConfig} */
import { withAxiom } from "next-axiom";

const nextConfig = withAxiom({
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
});

export default nextConfig;
