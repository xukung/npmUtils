var webpack = require('webpack');

var productionEnv = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
        // NODE_ENV: JSON.stringify("development")
    }
});

var uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
});


var path = require('path');

module.exports = {
    entry: {
        index: ['./src/index.js'],
    },
    output: {
        path: path.join(__dirname, 'lib/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                },
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=[path][name].[ext]'
            }
        ]
    },
    plugins: [productionEnv, uglify]
};