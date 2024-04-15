const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.orgsyn.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig


