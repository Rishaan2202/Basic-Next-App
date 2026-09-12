/** @type {import('next').NextConfig} */

const nextConfig = {

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.hackclub.com'
        },
        {
          protocol: 'https',
          hostname: 'cdn.hackclub.com'
        }
      ],
    },
    
};  

export default nextConfig;
