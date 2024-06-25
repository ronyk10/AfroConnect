/** @type {import('next').NextConfig} */

const __dirname = new URL(".", import.meta.url).pathname;
console.log("dirname", __dirname);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  },
};

export default nextConfig;
