/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@multi-site-ai/shared-app'],
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
            },
        ],
    }
}

export default nextConfig 