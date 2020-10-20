const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        proxy: {
            "/history/*": {
                target: "http://localhost:8080/",
                secure: false,
                changeOrigin: true
            },
            "/realtime/*": {
                target: "ws://localhost:8080/",
                secure: false,
                changeOrigin: true,
                ws: true
            }
        }
    },
    plugins: [
        ///...
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
        ///...
    ]
};
