/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // Matches any subdomains (e.g., assets.example.com)
      },
    ],
  },
};

export default nextConfig;
