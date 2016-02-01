var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'ngOneTsWebpack',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};

module.exports = {

  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  entry: "./src/app/app.ts",

  // Config for our build files
  output: {
    path: root('dist'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },

  module: {

    loaders: [
      //Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e|async)\.ts$/]
      },
      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      //
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass!'
      },
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      }

    ]

  },

  postcss: function () {
    return [
      autoprefixer({ browsers: ['last 2 versions'] }), precss
    ];
  },

  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  }
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}