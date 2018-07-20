const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
        new HtmlWebpackPlugin({
            title: 'ACSS devtools',
            filename: 'sidebar.html',
            template: 'src/template/sidebar.html',
            chunks: ['sidebar']
        }),
        new HtmlWebpackPlugin({
            title: 'ACSS devtools',
            filename: 'devtools.html',
            chunks: ['devtools']
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    }
};
