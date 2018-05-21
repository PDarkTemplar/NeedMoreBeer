import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import resolve from './webpack.resolve.config';

export default env => {
    const config = {
        output: {
            path: `${__dirname}/public/static/`,
            filename: '[name].bundle.js',
            chunkFilename: '[id].chunk.js',
            publicPath: `${process.env.HOST}/static/`,
        },
        optimization: {
            runtimeChunk: true,
            splitChunks: {
                cacheGroups: {
                    commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'initial' },
                    asyncCommons: {
                        test: /[\\/]node_modules[\\/]/,
                        minChunks: 2,
                        name: 'vendors.async',
                        chunks: 'async',
                    },
                },
            },
        },
        resolve,
        module: {
            rules: [
                {
                    test: /\.bundle\.(js|jsx)$/,
                    loader: 'bundle-loader',
                    options: {
                        lazy: true,
                    },
                },
                {
                    test: /\.(woff|woff2)(\?.*)?$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.(png|jpg|gif)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[hash:8].[ext]',
                        },
                    },
                },
            ],
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
                HOST: JSON.stringify(process.env.HOST),
                REST_UI_URL: JSON.stringify(process.env.REST_UI_URL),
                BASE_NAME: JSON.stringify(process.env.BASE_NAME),
            }),
            new HtmlWebpackPlugin({
                filename: '../index.html',
                template: './src/index.html',
            }),
            new CopyWebpackPlugin([
                {
                    from: './web.config',
                    to: '../web.config',
                },
            ]),
        ],
    };

    if (env.visualize) {
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            })
        );
    }

    if (env.c) {
        config.plugins.push(new CleanWebpackPlugin(['public']));
    }

    return config;
};
