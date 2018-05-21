import webpack from 'webpack';

import { globalStyles, moduleStyles } from './webpack.styles.config';

export default () => ({
    entry: ['webpack-hot-middleware/client?reload=true', './src/index.dev.jsx'],
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: [
                    {
                        loader: 'babel-loader',
                        options: {
                            envName: 'app',
                        },
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                exclude: /(node_modules|.+\.global\.)/,
                use: [{ loader: 'style-loader', options: { singleton: true } }, ...moduleStyles],
            },
            {
                test: /\.(css|scss)$/,
                include: /.+\.global\./,
                exclude: /node_modules/,
                use: [{ loader: 'style-loader', options: { singleton: true } }, ...globalStyles],
            },
            {
                test: /\.(css|scss)$/,
                include: /node_modules/,
                use: [{ loader: 'style-loader', options: { singleton: true } }, ...globalStyles],
            },
        ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
