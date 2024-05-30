import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config: webpack.Configuration = {
    mode: process.env.NODE_ENV === 'development'? 'development' : 'production',
    entry: {
        main: path.resolve('./src/main.tsx')
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheCompression: false,
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'development' ? '[name]_[contenthash].css' : '[contenthash].css',
            ignoreOrder: true
        }),
        new HtmlWebpackPlugin({
            template: './pageTemplate.html',
            favicon: './favicon.ico',
            filename: 'index.html',
            chunks: ['main'],
            title: 'Таймер',
        })
    ],
    output: {
        path: path.resolve('./dist'),
        filename: process.env.NODE_ENV === 'development' ? '[name]_[contenthash].bundle.js' : '[contenthash].bundle.js',
    },
    optimization: {
        runtimeChunk: 'single',
        innerGraph: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        providedExports: true,
        realContentHash: true,
        sideEffects: false,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        },
    },
};

if (process.env.NODE_ENV === 'development') {
    console.log("\x1b[33m", `
    ██████╗ ███████╗██╗   ██╗███████╗██╗      █████╗ ██████╗ ███╗   ███╗███████╗███╗  ██╗████████╗
    ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔══██╗██╔══██╗████╗ ████║██╔════╝████╗ ██║╚══██╔══╝
    ██║  ██║█████╗  ╚██╗ ██╔╝█████╗  ██║     ██║  ██║██████╔╝██╔████╔██║█████╗  ██╔██╗██║   ██║   
    ██║  ██║██╔══╝   ╚████╔╝ ██╔══╝  ██║     ██║  ██║██╔═══╝ ██║╚██╔╝██║██╔══╝  ██║╚████║   ██║   
    ██████╔╝███████╗  ╚██╔╝  ███████╗███████╗╚█████╔╝██║     ██║ ╚═╝ ██║███████╗██║ ╚███║   ██║   
    ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚══════╝ ╚════╝ ╚═╝     ╚═╝     ╚═╝╚══════╝╚═╝  ╚══╝   ╚═╝ `);
} else {
    console.log("\x1b[31m", `
    ██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗ █████╗ ████████╗██╗ █████╗ ███╗  ██╗
    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗╚══██╔══╝██║██╔══██╗████╗ ██║
    ██████╔╝██████╔╝██║  ██║██║  ██║██║   ██║██║  ╚═╝   ██║   ██║██║  ██║██╔██╗██║
    ██╔═══╝ ██╔══██╗██║  ██║██║  ██║██║   ██║██║  ██╗   ██║   ██║██║  ██║██║╚████║
    ██║     ██║  ██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝   ██║   ██║╚█████╔╝██║ ╚███║
    ╚═╝     ╚═╝  ╚═╝ ╚════╝ ╚═════╝  ╚═════╝  ╚════╝    ╚═╝   ╚═╝ ╚════╝ ╚═╝  ╚══╝`);
}
console.log('\x1b[37m', process.env.NODE_ENV);
export default config;