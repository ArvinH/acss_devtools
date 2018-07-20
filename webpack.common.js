const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        sidebar: './src/js/sidebar.js',
        devtools: './src/js/devtools.js'
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
        new CleanWebpackPlugin(['build', 'dest']),
        new CopyWebpackPlugin([
            { from: 'src/images/', to: 'images/' },
            {
                from: 'src/manifest.json',
                transform(content) {
                    return Buffer.from(
                        JSON.stringify(
                            Object.assign(
                                {
                                    description:
                                        process.env.npm_package_description,
                                    version: process.env.npm_package_version
                                },
                                JSON.parse(content.toString())
                            ),
                            null,
                            2
                        )
                    );
                }
            }
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
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js'
    }
};
