/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXT_PUBLIC_ZEGO_APP_ID:156174806,
    NEXT_PUBLIC_ZEGO_SERVER_ID:"838919267ceb2ae59b444ba95324dce0"
  },
  images:{
    domains: ["localhost"]
  }
};

module.exports = nextConfig;
