const webpack = require('webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* images: {
     *     unoptimized: true,
     * }, */
}

module.exports = {
    ...nextConfig,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    webpack: (config, { isServer, nextRuntime }) => {
        // Avoid AWS SDK Node.js require issue https://github.com/aws-amplify/amplify-js/issues/11030
        if (isServer && nextRuntime === 'nodejs')
            config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }))

        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    },
}
