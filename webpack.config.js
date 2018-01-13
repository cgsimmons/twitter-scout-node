const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.join(__dirname, 'src', 'client', 'app-client.js'),
    output: {
        path: path.join(__dirname, 'src', 'server', 'static', 'js'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            loader: ['babel-loader'],
            query: {
                cacheDirectory: 'babel_cache',
            },
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                BASE_URL: JSON.stringify(process.env.BASE_URL),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
            },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true,
            output: {
                comments: false,
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0,
        }),
    ],
};
