/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000", // kalau backend Laravel jalan di port 8000
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
