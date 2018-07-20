const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        sidebar: './src/js/sidebar.js',
        devtools: './src/js/devtools.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        openPage: 'sidebar.html'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'src/images/', to: 'images/' },
            'src/manifest.json'
        ]),
        new HtmlWebpackPlugin({
            template: './src/sidebar.html',
            filename: 'sidebar.html',
            chunks: ['sidebar']
        }),
        new HtmlWebpackPlugin({
            filename: 'devtools.html',
            chunks: ['devtools']
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    }
};
