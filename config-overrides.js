const webpack = require('webpack');

const {
    override,
    addBabelPlugins,
  } = require("customize-cra")

// bug fix
function web3BugFix(config) {

    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })

    ])
    return config;
}

module.exports = function (config){
    return web3BugFix(config)
    // return override(addBabelPlugins("@babel/plugin-syntax-bigint"))(web3BugFix(config))
}