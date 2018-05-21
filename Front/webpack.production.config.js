import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import { globalStyles, moduleStyles } from './webpack.styles.config';

export default () => ({
    entry: ['./src/index.prod.jsx'],
    mode: 'production',
    devtool: process.env.DEBUG === 'true' ? 'source-map' : false,
    output: {
        filename: '[name].bundle.[chunkhash].js',
        chunkFilename: '[id].[name].chunk.[chunkhash].js',
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: process.env.DEBUG === 'true',
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        envName: 'app',
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                exclude: /(node_modules|.+\.global\.)/,
                use: [MiniCssExtractPlugin.loader, ...moduleStyles],
            },
            {
                test: /\.(css|scss)$/,
                include: /.+\.global\./,
                use: [MiniCssExtractPlugin.loader, ...globalStyles],
            },
        ],
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { reduceIdents: false, zindex: false },
        }),
        new MiniCssExtractPlugin({
            filename: 'stylesheets/[name].[chunkhash].css',
            chunkFilename: 'stylesheets/[id].[chunkhash].css',
        }),
    ],
});
