const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const {publicRuntimeConfig} = require('./next.runtimeConfig');

const localIdentName = `${process.env.NODE_ENV === 'production' ? '' : '[path]'}[local]___[hash:base64:5]`;

const buildConfig = withTypescript(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName,
  },
  publicRuntimeConfig,
}));

module.exports = buildConfig;
