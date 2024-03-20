/** @type {import('next').NextConfig} */
import { withAxiom } from "next-axiom";

const nextConfig = withAxiom({
  productionBrowserSourceMaps: true,
});

export default nextConfig;
