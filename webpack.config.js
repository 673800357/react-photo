'use strict';
var webpack = require('webpack');

module.exports = {

    output: {
        filename: 'main.js',
        publicPath: '/assets/'
    },

    cache: true,
    debug: true,
    devtool: 'sourcemap',
    entry: [
        'webpack/hot/only-dev-server',
        './src/components/ReactPhotoApp.js'
    ],

    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': __dirname + '/src/styles',
            'mixins': __dirname + '/src/mixins',
            'components': __dirname + '/src/components/'
        }
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel-loader'// transpiling compiling
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=8192'
        },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

};
