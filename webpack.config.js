var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  entry: [path.resolve(ROOT_PATH, 'app/main')],
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // test for both js and jsx
        test: /\.js(x?)$/,

        // use babel loader with Stage 1 features
        loader: 'babel-loader',

        // operate only on our app directory
        include: [
          path.resolve(ROOT_PATH, 'app'),
          path.resolve(ROOT_PATH, 'node_modules/react-google-maps')
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'fnpm2'
    })
  ]
};

// we'll extend these later and use merge then
if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [

    //force NODE_ENV=production for more react performance

      // new webpack.DefinePlugin({
      //   'process.env': {
      //     // This has effect on the react lib size
      //     'NODE_ENV': JSON.stringify('production')
      //   }
      // }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if(TARGET === 'dev') {
  module.exports = merge(common, {
    devtool: 'eval',
    entry: [
      'webpack/hot/dev-server'
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel-loader'],
          include: path.resolve(ROOT_PATH, 'app'),
        },
      ],
    },
  });
}
