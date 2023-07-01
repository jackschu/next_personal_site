/** @type {import('next').NextConfig} */
const nextConfig = {
    /* images: {
     *     unoptimized: true,
     * }, */
}

module.exports = {
    ...nextConfig,
    webpack: (config) => {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    },
    experimental: {
        serverActions: true,
    },
}
