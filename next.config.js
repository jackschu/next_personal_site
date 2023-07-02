const webpack = require('webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* images: {
     *     unoptimized: true,
     * }, */
}

module.exports = {
    ...nextConfig,
    webpack: (config, { isServer, nextRuntime }) => {
        // Avoid AWS SDK Node.js require issue https://github.com/aws-amplify/amplify-js/issues/11030
        if (isServer && nextRuntime === 'nodejs')
            config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }))

        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    },
    experimental: {
        serverActions: true,
    },
}
