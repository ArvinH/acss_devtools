const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        sidebar: './src/js/sidebar.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'ACSS devtools',
            filename: '../sidebar.html',
            template: 'src/template/sidebar.html'
        })
    ]
};
