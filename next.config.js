const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.orgsyn.org',
                port: '',
                pathname: '/content/figures/**',
            },
        ],
    },
}

module.exports = nextConfig


